from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from components.form import complete_form
from time import sleep
import os
from datetime import datetime
import random

now = datetime.now()
log_path = os.getcwd() + '\\logs\\'
logFile = open(f'{log_path}{now.strftime("%d%m%Y_%H%M%S")}.txt', "w", encoding='utf-8')

def wait(driver: Chrome, locator: By, element: str, time_await = 10) -> bool:
  try:
    WebDriverWait(driver, time_await).until(EC.presence_of_element_located((locator, element)))
    sleep(2)
    return True
  except TimeoutException:
    return False
    
def log(message: str, error: bool = False):
  if error:
    finalMessage = f'[error]: {message}'
  else:
    finalMessage = f'[success]: {message}'
  logFile.write(f'{finalMessage}\n')
  print(finalMessage)

def randomNumbers(n):
  value = ''
  for index in range(n):
    value = value + f'{random.randint(1,100)}'
  return value

def login(driver: Chrome, email, password):
  driver.find_element(By.ID, 'joinBtn').click()
  log('botão de entrar encontrado')
  wait(driver,By.ID,'loginPage')
  formDataLogin = [
    {
      'name': 'email',
      'value': email,
      'type': 0
    },
    {
      'name': 'password',
      'value': password,
      'type': 0
    }
  ]
  complete_form(driver,formDataLogin,'loginBtn')
  if wait(driver,By.ID,'homePage'):
    log(f'perfil {email} entrado com sucesso')
    return
  raise Exception(f'Erro ao logar com o perfil de {email}')

def logout(driver: Chrome):
  driver.find_element(By.CLASS_NAME,'btnProfile').click()
  driver.find_element(By.ID,'btnlogout').click()
  wait(driver,By.ID,'loginPage')
  driver.find_element(By.ID,'navigateHome').click()
  log('logout completado com sucesso')

class EmailServices:
  def __init__(self, driver: Chrome) -> None:
    self.driver = driver
    self.driver.execute_script("window.open('');")
    self.window_handle = self.driver.window_handles[len(driver.window_handles) - 1]
    self.driver.switch_to.window(self.window_handle)
    self.driver.get('https://www.invertexto.com/gerador-email-temporario')
    wait(self.driver,By.ID, 'email-input')
    self.email = self.driver.find_element(By.ID, 'email-input').get_attribute('value')
    self.driver.switch_to.window(self.driver.window_handles[0])
    self.responses = {}

  def getCodeEmail(self):
    self.driver.switch_to.window(self.window_handle)
    sleep(10)
    self.driver.execute_script('arguments[0].click()',self.driver.find_elements(By.CSS_SELECTOR,'tr')[1])
    sleep(5)
    code = self.driver.find_element(By.CLASS_NAME,'content').find_element(By.CSS_SELECTOR,'h4').text
    self.driver.switch_to.window(self.driver.window_handles[0])
    return code
    