const express = require('express')
const rotasProdutos = require('./routes/rotasProdutos')

let app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Você está na Homepage</h1>')
})

app.use('/produtos', rotasProdutos)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))