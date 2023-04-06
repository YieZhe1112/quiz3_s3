const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/login', (req, res) => { //req=requesr, res=response
  console.log(req.body)
  res.send('Login') 
})

app.get('/', (req, res) => {
  res.send('404 Not Found') //localhost:300
})

app.get('/bye', (req, res) => {
  res.send('Bye 404 Not Found') //localhost:300/bye
})

app.post('/register', (req, res) => {
  res.send('Account Created') 
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})