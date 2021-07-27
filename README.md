# crud-app


Register API 

curl --location --request POST 'http://localhost:3000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "ketan@gmail.com",
    "password"  : "12345"
}'


Get ALL Users  API 

curl --location --request GET 'http://localhost:3000/users' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldGFuQGdtYWlsLmNvbSIsImlhdCI6MTYyNzMyNTExMX0.8erzMB_txWaRTox5fXfA3qDaIfwpsQ7xgsQBr9BF6dc'



Login API :  

curl --location --request POST 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email"  : "ketan@gmail.com",
    "password" : "12345"
}'


DelEte API 
curl --location --request DELETE 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "ketan11@gmail.com"
}'

gET ALL Taks of all Users API 

curl --location --request GET 'http://localhost:3000/tasks' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldGFuQGdtYWlsLmNvbSIsImlhdCI6MTYyNzMyNTExMX0.8erzMB_txWaRTox5fXfA3qDaIfwpsQ7xgsQBr9BF6dc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email"  : "ketan@gmail.com"
}'

