browser = input('Type a browser: ').lower()
with open('python_v1\settings.txt', 'w') as f:
   if browser == 'edge':
      f.write('browser = edge')
      f.close()
   elif browser == 'chrome':
      f.write('browser = chrome')
      f.close()
   elif browser == 'firefox':
      f.write('browser = firefox')
      f.close()
f = open('python_v1\settings.txt', 'r')
print(f.read())
f.close()