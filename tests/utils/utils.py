from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
import os
from datetime import datetime
from selenium.webdriver.support.select import Select

now = datetime.now()
log_path = os.getcwd() + '\\logs\\'
logFile = open(f'{log_path}{now.strftime("%d%m%Y_%H%M%S")}.txt', "w", encoding='utf-8')

def wait(driver: webdriver, locator: By, element: str, time_await = 10) -> bool:
  try:
      WebDriverWait(driver, time_await).until(EC.presence_of_element_located((locator, element)))
      sleep(2)
      return True
  except TimeoutException:
      return False
    
def log(message: str, error: bool = False):
  if error:
    logFile.write(f'[error]: {message}\n')
  else:
    logFile.write(f'[success]: {message}\n')

def SelectOption(driver, name, value):
  for select in driver.find_elements(By.CLASS_NAME,'css-at3jax-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root'):
    for el in select.find_elements(By.TAG_NAME, 'div'):
      if el.get_attribute('id') == f'mui-component-select-{name}':
        select.click()
        sleep(5)
        options = driver.find_elements(By.CLASS_NAME,'MuiMenuItem-gutters')
        driver.execute_script('arguments[0].click()',options[value])

def complete_form(driver, data: list[dict], submitId: str):
  for content in data:
    driver.find_element(By.NAME, content['name']).clear()
    driver.find_element(By.NAME, content['name']).send_keys(content['value'])
  driver.find_element(By.ID, submitId).click()

def find_errors_form(driver, validator: list[dict], submitId: str):
  for item in validator:
    formData = item['formData']
    complete_form(driver,formData,submitId)
    if item['popup']:
      wait(driver,By.ID,'popupText')
      if driver.find_element(By.ID, 'popupText').text == item['error_message']:
        log(item['log_success'])
      else:
        log(item['log_error'],True)
      driver.find_element(By.ID,'confirmPopUp').click()
    else:
      wait(driver,By.CLASS_NAME,'bzpbLg')
      if driver.find_element(By.CLASS_NAME, 'bzpbLg').text == item['error_message']:
        log(item['log_success'])
      else:
        log(item['log_error'],True)