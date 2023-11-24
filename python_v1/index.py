import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import pandas as pd

# Get Browser
browser = input('Which browser are you using for this task?(edge, chrome or firefox) ').lower()

# Get Product and specifications
productName = input('Type the name of the product: ')
print('Product name: {}'.format(productName))

modifiers = input('Type the specifications: ')
print('Modifiers: {}'.format(modifiers))

# Setting up "settings" file
settingsFile = open('python_v1\settings.txt', 'w')

# Selenium driver configuration
if browser == 'edge':
   settingsFile.write('browser = edge')
   driver = webdriver.Edge() # Set for Microsoft Edge
elif browser == 'chrome':
   settingsFile.write('browser = chrome')
   driver =  webdriver.Chrome() # Set for Google Chrome
elif browser == 'firefox':
   settingsFile.write('browser = firefox')
   driver = webdriver.Firefox() # Set for Mozilla Firefox

settingsFile.close()

# Website URL
driver.get('https://shopping.google.com/?nord=1&pli=1')
element = driver.find_element(By.ID, 'REsRA')
element.send_keys(productName, ' ', modifiers)
element.send_keys(Keys.ENTER)

productsFetch = driver.find_elements(By.CLASS_NAME, 'tAxDx')
pricesFetch = driver.find_elements(By.CSS_SELECTOR, "span[class='a8Pemb OFFNJ']")
storesFetch = driver.find_elements(By.CSS_SELECTOR, "div[class='aULzUe IuHnof']")
urlsFetch = driver.find_elements(By.CSS_SELECTOR, "a[class='Lq5OHe eaGTj translate-content']")

# Create products list
products = []
prices = []
stores = []
urls = []
i = 0
j = 0
k = 9
l = 0

for item in productsFetch:
   products.insert(i, item.text)
   i += 1

for price in pricesFetch:
   prices.insert(j, price.text)
   j += 1

for store in storesFetch:
   stores.insert(k, store.text)
   k += 1

for url in urlsFetch:
   urls.insert(l, url.get_attribute('href'))
   print(url.get_attribute('href'))
   l += 1

# Create CSV Sheet
df = pd.DataFrame({
   "Product": products,
   "Prices": prices,
   "Store": stores,
   "Links": urls
    })

df.to_csv('output.csv', sep=';', index=False)

# Close Selenium driver
driver.quit()