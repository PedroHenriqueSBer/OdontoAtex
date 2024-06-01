from selenium.webdriver.common.by import By
from components.mui_input import mui_input
from components.select import mui_select
from selenium.webdriver import Chrome
from time import sleep

def complete_form(driver: Chrome, data: list[dict], submitId: str):
  for content in data:
    if(content['type'] == 0):
      mui_input(driver,By.NAME,content['name']).write(content['value'])
    if(content['type'] == 1):
      mui_select(driver,content['name']).select_option(content['value'])
    sleep(5)
  driver.find_element(By.ID, submitId).click()

def find_errors_form(driver: Chrome, validator: list[dict], submitId: str):
  from utils.utils import wait, log
  for item in validator:
    complete_form(driver,item['formData'],submitId)
    if item['popup']:
      if wait(driver,By.ID,'popupText'):
        if driver.find_element(By.ID, 'popupText').text == item['error_message']:
          log(item['log_success'])
        else:
          log(item['log_error'],True)
        driver.find_element(By.ID,'confirmPopUp').click()
      else:
        log(item['log_error'],True)
    else:
      wait(driver,By.CLASS_NAME,'MuiFormHelperText-root')
      if driver.find_element(By.CLASS_NAME, 'MuiFormHelperText-root').text == item['error_message']:
        log(item['log_success'])
      else:
        log(item['log_error'],True)
    driver.refresh()
    sleep(10)