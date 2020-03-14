const express = require('express')
const path = require('path')

const app = express()

const publicPath = path.join(__dirname,'/public')


app.use(express.static(publicPath))
app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/', (req,res) => {
    res.render('index.html')
})

app.get('/home', (req,res) => {
    res.render('home.html')
})
app.get('/calculate', (req,res) => {
    res.render('calculate.html')
})

app.get('/*', (req,res) => {
    res.send('Canot find requested page')
})

app.listen(PORT, () => {
    console.log('Listeneing on PORT ' + PORT)
})