import sys
sys.path.append('../')
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from utils.utils import wait, log, login, EmailServices, randomNumbers, logout, now
from utils.config import BASE_URL
from components.form import complete_form, find_errors_form
from components.mui_input import mui_input
from enums import type_user
from time import sleep

def custom_email_find_errors_form(driver: Chrome, validator: list[dict]):
  for item in validator:
    wait(driver,By.ID,'resetPasswordBtn')
    driver.find_element(By.ID,'resetPasswordBtn').click()
    wait(driver,By.ID,'resetPassword')
    complete_form(driver,item['formData'],'sendCodeBtn')
    wait(driver,By.CLASS_NAME,'MuiFormHelperText-root')
    if driver.find_element(By.CLASS_NAME, 'MuiFormHelperText-root').text == item['error_message']:
      log(item['log_success'])
    else:
      log(item['log_error'],True)
    driver.refresh()
    sleep(10)
  
def custom_code_find_errors_form(driver: Chrome, validator: list[dict], email: EmailServices):
    for item in validator:
      wait(driver,By.ID,'resetPasswordBtn')
      driver.find_element(By.ID,'resetPasswordBtn').click()
      wait(driver,By.ID,'resetPassword')
      complete_form(driver,[
        {
          'name': 'to',
          'value': email.email,
          'type': 0
        }
      ],'sendCodeBtn')
      sleep(10)
      if item['formData'][0]['value'] == 'code':
        code = email.getCodeEmail()
        item['formData'][0]['value'] = code
      complete_form(driver,item['formData'],'savePassword')
      wait(driver,By.CLASS_NAME,'MuiFormHelperText-root')
      if driver.find_element(By.CLASS_NAME, 'MuiFormHelperText-root').text == item['error_message']:
        log(item['log_success'])
      else:
        log(item['log_error'],True)
      driver.refresh()
      sleep(10)

def createUser(driver: Chrome, account: dict):
  email_service = EmailServices(driver)
  formData = [
    {
      'name': 'name',
      'value': account['name'],
      'type': 0
    },
    {
      'name': 'email',
      'value': email_service.email,
      'type': 0
    },
    {
      'name': 'type',
      'value': account['type'],
      'type': 1
    }
  ]
  if account['type'] == type_user.STUDENT:
    formData.append({'name': 'number','value': randomNumbers(9),'type': 0})
    formData.append({'name': 'period','value': '5','type': 1})
  complete_form(
    driver,
    formData,
    'btnCreateUser'
  )
  sleep(10)
  mui_input(driver,By.ID,'search').write(account['name'])
  sleep(2)
  if not driver.find_element(By.CSS_SELECTOR,'.content').find_element(By.CSS_SELECTOR,'h4').text == account['name']:
    log(f'usuário {account["name"]} não criado com sucesso', True)
  log(f'usuário {account["name"]} criado com sucesso')
  logout(driver)
  login(driver, 'adm@adm.com','senha forte')
  driver.find_element(By.CLASS_NAME,'user').click()
  wait(driver,By.ID,'userPage')
  return email_service


def runLoginPage(url: str):
  log('iniciando o teste de login')
  options = webdriver.ChromeOptions()
  options.add_argument("--start-maximized")
  driver = webdriver.Chrome(options, Service(ChromeDriverManager().install()))

  driver.get(url)
  wait(driver,By.ID,'homePage')
  try:
    driver.find_element(By.ID, 'joinBtn').click()
    log('botão de entrar encontrado')
    wait(driver,By.ID,'loginPage')
    validator = [
      {
        'formData': [
          {
            'name': 'email',
            'value': 'adm@adms.com',
            'type': 0
          },
          {
            'name': 'password',
            'value': 'senha fortes',
            'type': 0
          }
        ],
        'popup': True,
        'error_message': 'Usuário não encontrado',
        'log_success': 'Email inválido foi encontrado com sucesso',
        'log_error': 'Email inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'email',
            'value': 'adm@adm.com',
            'type': 0
          },
          {
            'name': 'password',
            'value': 'senha fortes',
            'type': 0
          }
        ],
        'popup': True,
        'error_message': 'Senha Incorreta',
        'log_success': 'Senha inválida foi encontrada com sucesso',
        'log_error': 'Senha inválida foi aceita'
      },
      {
        'formData': [
          {
            'name': 'email',
            'value': 'emailinvalido',
            'type': 0
          },
          {
            'name': 'password',
            'value': ' ',
            'type': 0
          }
        ],
        'popup': False,
        'error_message': 'Email inválido',
        'log_success': 'Email inválido foi encontrada com sucesso',
        'log_error': 'Email inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'email',
            'value': 'adm@adm.com',
            'type': 0
          },
          {
            'name': 'password',
            'value': ' ',
            'type': 0
          }
        ],
        'popup': False,
        'error_message': 'mínimo 6 caracteres',
        'log_success': 'Valor mínimo da senha foi encontrada com sucesso',
        'log_error': 'Valor mínimo da senha  foi aceito'
      }
    ]
    find_errors_form(driver,validator,'loginBtn')

    formData = [
      {
        'name': 'email',
        'value': 'adm@adm.com',
        'type': 0
      },
      {
        'name': 'password',
        'value': 'senha forte',
        'type': 0
      }
    ]
    complete_form(driver,formData,'loginBtn')
    if not wait(driver,By.ID,'homePage'):
      raise Exception('Erro ao logar com o perfil de adm@adm.com')
    driver.find_element(By.CLASS_NAME,'user').click()
    wait(driver,By.ID,'userPage')
    account: dict = {
      'name': f'Student_Test_{now}',
      'type': type_user.STUDENT,
      'number': randomNumbers(9),
      'period': '5'
    }
    email = createUser(driver, account)
    logout(driver)
    driver.find_element(By.ID, 'joinBtn').click()
    wait(driver,By.ID,'loginPage')
    validator = [
      {
        'formData': [
          {
            'name': 'to',
            'value': 'emailinvalido',
            'type': 0
          }
        ],
        'error_message': 'entre com um email válido',
        'log_success': 'email inválido foi encontrada com sucesso',
        'log_error': 'email inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'to',
            'value': 'emailinexistente@outlook.com',
            'type': 0
          }
        ],
        'error_message': 'Email inexistente',
        'log_success': 'email inexistente foi encontrada com sucesso',
        'log_error': 'email inexistente foi aceito'
      }
    ]
    custom_email_find_errors_form(driver, validator)
    validator = [
      {
        'formData': [
          {
            'name': 'code',
            'value': '1234',
            'type': 0
          }
        ],
        'error_message': 'campo necessário',
        'log_success': 'senha inválido foi encontrada com sucesso',
        'log_error': 'senha inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'code',
            'value': '1234',
            'type': 0
          },
          {
            'name': 'newPassword',
            'value': 'se',
            'type': 0
          },
          {
            'name': 'confirmNewPassword',
            'value': 'se',
            'type': 0
          }
        ],
        'error_message': 'precisa de 3 caracteres no mínimo',
        'log_success': 'senha inválido foi encontrada com sucesso',
        'log_error': 'senha inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'code',
            'value': '1234',
            'type': 0
          },
          {
            'name': 'newPassword',
            'value': 'senhanova',
            'type': 0
          },
          {
            'name': 'confirmNewPassword',
            'value': 'se',
            'type': 0
          }
        ],
        'error_message': 'Código inválido',
        'log_success': 'código inválido foi encontrada com sucesso',
        'log_error': 'código inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'code',
            'value': 'code',
            'type': 0
          },
          {
            'name': 'newPassword',
            'value': 'senhanova',
            'type': 0
          },
          {
            'name': 'confirmNewPassword',
            'value': 'se',
            'type': 0
          }
        ],
        'error_message': 'As senhas não conhecidem',
        'log_success': 'confirmar senha inválido foi encontrada com sucesso',
        'log_error': 'confirmar senha inválido foi aceito'
      }
    ]
    custom_code_find_errors_form(driver, validator, email)
    wait(driver,By.ID,'resetPasswordBtn')
    driver.find_element(By.ID,'resetPasswordBtn').click()
    wait(driver,By.ID,'resetPassword')
    complete_form(driver,[
      {
        'name': 'to',
        'value': email.email,
        'type': 0
      }
    ],'sendCodeBtn')
    code = email.getCodeEmail()
    complete_form(driver,[
      {
        'name': 'code',
        'value': code,
        'type': 0
      },
      {
        'name': 'newPassword',
        'value': 'senhanova',
        'type': 0
      },
      {
        'name': 'confirmNewPassword',
        'value': 'senhanova',
        'type': 0
      }
    ],'savePassword')
    if wait(driver,By.ID,'popupText'):
      if driver.find_element(By.ID, 'popupText').text == 'Senha alterada com sucesso':
        log('senha foi alterada com sucesso')
      else:
        log('erro ao atualizar senha',True)
      driver.find_element(By.ID,'confirmPopUp').click()
    driver.refresh()
    sleep(5)
    login(driver,email.email,'senhanova')
    logout(driver)
    log('logout completado com sucesso')
    log('login funcionando \n')
    driver.close()

  except Exception as e:
    driver.close()
    log(f'Erro testar a pagina de login: \n {e} \n',True)
  
