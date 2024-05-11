import sys
sys.path.append('../')
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from utils.utils import wait, log, complete_form

def login(driver, email, password):
    driver.find_element(By.ID, 'joinBtn').click()
    log('botão de entrar encontrado')
    wait(driver,By.ID,'loginPage')
    formDataLogin = [
      {
        'name': 'email',
        'value': email
      },
      {
        'name': 'password',
        'value': password
      }
    ]
    complete_form(driver,formDataLogin,'loginBtn')
    if not wait(driver,By.ID,'homePage'):
      raise Exception(f'Erro ao logar com o perfil de {email}')
def logout(driver):
  driver.find_element(By.CLASS_NAME,'btnProfile').click()
  driver.find_element(By.ID,'btnlogout').click()
  wait(driver,By.ID,'loginPage')
  driver.find_element(By.ID,'navigateHome').click()
  log('logout completado com sucesso')
  
def isShow(driver,className,displayName,isShow,userType):
  if wait(driver,By.ID,className, 3):
    log(f'botão de {displayName} está aparecendo para o tipo {userType}', not isShow)
  else:
    log(f'botão de {displayName} não está aparecendo para o tipo {userType}', isShow)

def runHomePage(url: str):
  log('iniciando o teste de Home')
  options = webdriver.ChromeOptions()
  options.add_argument("--start-maximized")
  driver = webdriver.Chrome(options, Service(ChromeDriverManager().install()))
  try:
    driver.get(url)
    wait(driver,By.ID,'homePage')

    login(driver,'adm@adm.com','senha forte')
    isShow(driver,'patient','pacientes', True, 'adm')
    isShow(driver,'calendar','agenda', True, 'adm')
    isShow(driver,'screening','triagems', False, 'adm')
    isShow(driver,'user','usuarios', True, 'adm')
    logout(driver)

    login(driver,'aluno@aluno.com','senha forte')
    isShow(driver,'patient','pacientes', True, 'aluno')
    isShow(driver,'calendar','agenda', True, 'aluno')
    isShow(driver,'screening','triagems', True, 'aluno')
    isShow(driver,'user','usuarios', False, 'aluno')
    logout(driver)

    login(driver,'secretaria@secretaria.com','senha forte')
    isShow(driver,'patient','pacientes', True, 'secretaria')
    isShow(driver,'calendar','agenda', True, 'secretaria')
    isShow(driver,'screening','triagems', False, 'secretaria')
    isShow(driver,'user','usuarios', False, 'secretaria')
    logout(driver)

    login(driver,'professor@professor.com','senha forte')
    isShow(driver,'patient','pacientes', True, 'professor')
    isShow(driver,'calendar','agenda', True, 'professor')
    isShow(driver,'screening','triagems', True, 'professor')
    isShow(driver,'user','usuarios', False, 'professor')
    logout(driver)
    log('home funcionando \n')
    driver.close()

  except Exception as e:
    driver.close()
    log(f'Erro testar a pagina de home: \n {e} \n',True)
  

