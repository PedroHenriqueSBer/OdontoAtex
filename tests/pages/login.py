import sys
sys.path.append('../')
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from utils.utils import wait, log, complete_form

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
    formDataLogin = [
      {
        'name': 'email',
        'value': 'adm@adms.com'
      },
      {
        'name': 'password',
        'value': 'senha fortes'
      }
    ]
    complete_form(driver,formDataLogin,'loginBtn')
    wait(driver,By.ID,'popupText')
    if driver.find_element(By.ID, 'popupText').text == 'Usuário não encontrado':
      log('Email inválido foi encontrado com sucesso')
    else:
      log('Email inválido foi aceito',True)
    driver.find_element(By.ID,'confirmPopUp').click()
    formDataLogin = [
      {
        'name': 'email',
        'value': 'adm@adm.com'
      },
      {
        'name': 'password',
        'value': 'senha fortes'
      }
    ]
    complete_form(driver,formDataLogin,'loginBtn')
    wait(driver,By.ID,'popupText')
    if driver.find_element(By.ID, 'popupText').text == 'Senha Incorreta':
      log('Senha inválida foi encontrada com sucesso')
    else:
      log('Senha inválida foi aceita',True)
    driver.find_element(By.ID,'confirmPopUp').click()
    formDataLogin = [
      {
        'name': 'email',
        'value': 'adm@adm.com'
      },
      {
        'name': 'password',
        'value': 'senha forte'
      }
    ]
    complete_form(driver,formDataLogin,'loginBtn')
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
  

