const express = require('express')
const app = express()
const port = 3000

let dbUsers=[
  {   
      username : "Khoo",
      password : "112233",
      name : "Khoo",
      email : "khoo@student.utem.edu.my"
  },
  {   
      username : "Ho",
      password : "123456",
      name : "Ho",
      email : "ho@student.utem.edu.my"
  },
  {   
      username : "Tan",
      password : "223344",
      name : "Tan",
      email : "tan@student.utem.edu.my"
  }
]

function login(reqUsername,reqPassword){
  let matchUser = dbUsers.find(user => user.username == reqUsername) //=> means array dbUsers will pass every element it find into the variable "user"

  if(!matchUser) return "User not found!"

  if(matchUser.password == reqPassword){
      return matchUser
  } 
  else{
      return "Invalid password!"
  }
}

function register(regUsername,regPassword,regName,regEmail){
  dbUsers.push( //add the element into array dbUsers
      {
          username : regUsername,
          password : regPassword,
          name : regName,
          email : regEmail
      }
  )
}

app.get('/', (req, res) => {
  res.send('404 Not Found') //localhost:300
})

app.get('/bye', (req, res) => {
  res.send('Bye 404 Not Found') //localhost:300/bye
})

app.use(express.json())
app.post('/login', (req, res) => { //req=requesr, res=response
  console.log(req.body)

  let result = login(req.body.username,req.body.password)
  res.send(result) 
})

app.post('/register', (req, res) => {
  console.log(req.body)

  let result = register(req.body.username,req.body.password,req.body.name,req.body.email)
  res.send(result) 
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//hiiiiiiiiiiii