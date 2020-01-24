

import requests as rs
from urllib.request import urlopen
import csv
import requests

csv_url = 'https://docs.google.com/spreadsheets/d/1JLdVG0vWEGUdz91uG5u1MjPIZk8ilnkfDGGsJKV5Pqc/export?format=csv'
# csv_url = YOUR_CSV_DOWNLOAD_URL
res = rs.get(url=csv_url)
open('google.csv', 'wb').write(res.content)

# tests = ""

# with open('google.csv', 'r')as f:
#     tests = csv.reader(f)
# for row in tests:
# print(row[0])
