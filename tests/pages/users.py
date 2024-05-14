import sys
sys.path.append('../')
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from utils.utils import wait, log, complete_form, SelectOption
import random
from time import sleep

def randomNumbers(n):
  value = ''
  for index in range(n):
    value = value + f'{random.randint(1,100)}'
  return value

def login(driver):
  driver.find_element(By.ID, 'joinBtn').click()
  log('botão de entrar encontrado')
  wait(driver,By.ID,'loginPage')
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
    raise Exception(f'Erro ao logar com o perfil de adm')

def logout(driver):
  driver.find_element(By.CLASS_NAME,'btnProfile').click()
  driver.find_element(By.ID,'btnlogout').click()
  wait(driver,By.ID,'loginPage')
  driver.find_element(By.ID,'navigateHome').click()
  log('logout completado com sucesso')

def runUsersPage(url: str):
  log('iniciando o teste da tela de Usuários')
  options = webdriver.ChromeOptions()
  options.add_argument("--start-maximized")
  driver = webdriver.Chrome(options, Service(ChromeDriverManager().install()))

  driver.get(url)
  wait(driver,By.ID,'homePage')
  try:
    login(driver)
    driver.find_element(By.CLASS_NAME,'user').click()
    wait(driver,By.ID,'userPage')
    SelectOption(driver,'type',1)
    input('chegou aqui')
    logout(driver)
    log('Tela de usuário funcionando \n')
    driver.close()

  except Exception as e:
    driver.close()
    log(f'Erro testar a pagina de login: \n {e} \n',True)
  

