from selenium.webdriver import Chrome

class mui_input:
  def __init__(self, driver: Chrome, by, value) -> None:
    self.driver = driver
    self.element = driver.find_element(by, value)
  def write(self, value):
    self.element.clear()
    self.element.send_keys(value)