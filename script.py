import requests,string,random

lower = string.ascii_lowercase
symbols = "@#$%&*!"
upper = string.ascii_uppercase
num = string.digits
all = lower + symbols + upper + num

list = ['r@gmail.com','f@gmail.com','n@gmail.com']
temp = "".join(random.sample(all,10))
response = requests.post('http://localhost:5000/api/users/signup', json={
    "name": "raja faizan nazir",
    "email": "rfn@gmail.com",
    "password": temp
})
print(temp)
print(f"Status Code: {response.status_code}, Response: {response.json()}")
if response.status_code is 201:
  