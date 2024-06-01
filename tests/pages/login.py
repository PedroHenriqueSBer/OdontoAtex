import sys
sys.path.append('../')
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from utils.utils import wait, log
from utils.config import BASE_URL
from components.form import complete_form, find_errors_form

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

    complete_form(driver,[
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
    ],'loginBtn')


    if not wait(driver,By.ID,'homePage'):
      raise Exception('Erro ao logar com o perfil de adm@adm.com')
    driver.find_element(By.CLASS_NAME,'btnProfile').click()
    driver.find_element(By.ID,'btnlogout').click()
    wait(driver,By.ID,'loginPage')
    driver.find_element(By.ID,'navigateHome').click()
    log('logout completado com sucesso')
    log('login funcionando \n')
    driver.close()

  except Exception as e:
    driver.close()
    log(f'Erro testar a pagina de login: \n {e} \n',True)
  
