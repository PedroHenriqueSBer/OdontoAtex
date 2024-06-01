from selenium.webdriver.common.by import By
from time import sleep
from selenium.webdriver import Chrome

class mui_select:
  def __init__(self,driver: Chrome, name) -> None:
    self.driver = driver
    for select in self.driver.find_elements(By.CLASS_NAME,'css-at3jax-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root'):
      for el in select.find_elements(By.TAG_NAME, 'div'):
        if el.get_attribute('id') == f'mui-component-select-{name}':
          self.element = select

  def select_option(self,value):
    sleep(5)
    self.element.click()
    options = self.driver.find_elements(By.CLASS_NAME,'MuiMenuItem-gutters')
    for option in options:
      if option.get_attribute('data-value') == f'{value}':
        option.click()
