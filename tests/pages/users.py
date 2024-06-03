import sys
sys.path.append('../')
from selenium.webdriver import Chrome
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from utils.utils import wait, log, logout, login, EmailServices, now, randomNumbers
from components.form import complete_form, find_errors_form
from components.mui_input import mui_input
from enums import type_user
from utils.config import BASE_URL
from time import sleep

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
  code = email_service.getCodeEmail()
  logout(driver)
  login(driver,email_service.email,code)
  logout(driver)
  login(driver, 'adm@adm.com','senha forte')
  driver.find_element(By.CLASS_NAME,'user').click()
  wait(driver,By.ID,'userPage')
  return email_service.email

def runUsersPage(url: str):
  log('iniciando o teste da tela de Usuários')
  options = webdriver.ChromeOptions()
  options.add_argument("--start-maximized")
  driver = webdriver.Chrome(options, Service(ChromeDriverManager().install()))

  driver.get(url)
  wait(driver,By.ID,'homePage')
  try:
    login(driver, 'adm@adm.com','senha forte')
    driver.find_element(By.CLASS_NAME,'user').click()
    wait(driver,By.ID,'userPage')
    accounts = []
    accounts.append(
      {
        'name': f'Student_Test_{now}',
        'type': type_user.STUDENT,
        'number': randomNumbers(9),
        'period': '5'
      }
    )
    accounts.append(
      {
        'name': f'Secretary_Test_{now}',
        'type': type_user.SECRETARY,
      }
    )
    accounts.append(
      {
        'name': f'Teacher_Test_{now}',
        'type': type_user.TEACHER,
      }
    )
    for account in accounts:
      createUser(driver,account)

    logout(driver)
    login(driver, 'adm@adm.com','senha forte')
    driver.find_element(By.CLASS_NAME,'user').click()
    wait(driver,By.ID,'userPage')
    validator = [
      {
        'formData': [],
        'popup': False,
        'error_message': 'Campo nescessário',
        'log_success': 'Erro de campo necessário no email está funcionando',
        'log_error': 'Email inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'name',
            'value': 'Professor',
            'type': 0
          },
        ],
        'popup': False,
        'error_message': 'Campo nescessário',
        'log_success': 'Erro de campo necessário no nome está funcionando',
        'log_error': 'Nome inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'name',
            'value': 'Professor',
            'type': 0
          },
          {
            'name': 'email',
            'value': 'emailinválido',
            'type': 0
          }
        ],
        'popup': False,
        'error_message': 'Precisa ser um email válido',
        'log_success': 'Email inválido foi encontrado com sucesso',
        'log_error': 'Email inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'name',
            'value': 'Professor',
            'type': 0
          },
          {
            'name': 'email',
            'value': 'adm@adm.com',
            'type': 0
          }
        ],
        'popup': False,
        'error_message': 'Número inválido',
        'log_success': 'Número inválido foi encontrado com sucesso',
        'log_error': 'Número inválido foi aceito'
      },
      {
        'formData': [
          {
            'name': 'name',
            'value': 'Ademir',
            'type': 0
          },
          {
            'name': 'email',
            'value': 'adm@adm.com',
            'type': 0
          },
          {
            'name': 'number',
            'value': '22222222222222',
            'type': 0
          },
          {
            'name': 'number',
            'value': '22222222222222',
            'type': 0
          }
        ],
        'popup': True,
        'error_message': 'Este E-mail já está cadastrado',
        'log_success': 'Email cadastrado foi encontrado com sucesso',
        'log_error': 'Email cadastrado foi aceito'
      }
    ]
    find_errors_form(driver,validator,'btnCreateUser',True)
    log('Tela de usuário funcionando \n')
    driver.close()

  except Exception as e:
    driver.close()
    log(f'Erro testar a pagina de usuários: \n {e} \n',True)
