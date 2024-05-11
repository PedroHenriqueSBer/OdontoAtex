from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
import os
from datetime import datetime

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
    
def complete_form(driver, data: list[dict], submitId: str):
  for content in data:
    driver.find_element(By.NAME, content['name']).clear()
    driver.find_element(By.NAME, content['name']).send_keys(content['value'])
  driver.find_element(By.ID, submitId).click()