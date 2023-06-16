const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yiezhe1234:password01@cluster0.wahp7cl.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(res=>{
  console.log(res)
})

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

async function login(reqUsername,reqPassword){
  //let matchUser = dbUsers.find(user => user.username == reqUsername) //=> means array dbUsers will pass every element it find into the variable "user"
  let matchUser = await client.db("Benr_2423").collection("user")
    .find({$and:[
          {username:{$eq:reqUsername}},
          {password:{$eq:reqPassword}}
          ]})
  console.log(matchUser)

  if(!matchUser) return "User not found!"

  if(matchUser.password == reqPassword){
      return matchUser
  } 
  else{
      return "Invalid password!"
  }
}

function register(regUsername,regPassword,regName,regEmail,regPosition){
  client.db("Benr_2423").collection("user").insertOne(  //create the database name(Benr_2423) then collection name(user)
         {
              username : regUsername,
              password : regPassword,
              name : regName,
              email : regEmail,
              role : regPosition
          }
  )
  // dbUsers.push( //add the element into array dbUsers
  //     {
  //         username : regUsername,
  //         password : regPassword,
  //         name : regName,
  //         email : regEmail
  //     }
  // )
}

function generateToken(userData){
  const token = jwt.sign(userData, 'passwordforthetoken',{ expiresIn : 600 }); //userData is the input of the token, 'passwordforthetoken' is the password of the token, expiresIn means the valid time of the token
  return token;
}

function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)
  let token = header.split(' ')[1]//Authorization: Bearer[0] Token[1], split bearer and token to two seperate item

  jwt.verify(token,'passwordforthetoken',function(err,decoded){
    if(err){
      res.send("Invalid Token")
    }

    req.user = decoded
    next()
  })
}

app.get('/', (req, res) => {
  res.send('404 Not Found') //localhost:300
})

app.get('/check',verifyToken, (req, res) => {
  res.send('Bye 404 Not Found') //localhost:300/bye

})

app.use(express.json())
app.post('/login', (req, res) => { //req=requesr, res=response
  console.log(req.body)

  let result = login(req.body.username,req.body.password)
  //let token = generateToken(result)
  //res.send(token) 
})

app.post('/register', (req, res) => {
  console.log(req.body)

  let result = register(req.body.username,req.body.password,req.body.name,req.body.email)
  res.send(result) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})