from pages.home import runHomePage
from pages.login import runLoginPage
from pages.users import runUsersPage
from utils.config import BASE_URL

runLoginPage(BASE_URL)
runHomePage(BASE_URL)
runUsersPage(BASE_URL)