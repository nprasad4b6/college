const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

// const publicPath = path.join(__dirname,'/public')
const publicPath = path.join(__dirname,'/templates/views')
const viewPath = path.join(__dirname,'/templates/views')
const partilasPath = path.join(__dirname,'/templates/partials')

// hbs.registerPartials(partilasPath)

// app.set('view engine', 'hbs')
// app.set('views', viewPath)

app.use(express.static(publicPath))
app.use(express.json())

const PORT = process.env.PORT || 3000

// app.get('/', (req,res) => {
//     res.render('index',{
//         header:"Header1",
//         footer:"Prasad"
//     })
// })

app.get('/home', (req,res) => {
    res.render('HOME.html')
})

app.get('/calculate', (req,res) => {
    res.render('calculate')
})
app.get('/*', (req,res) => {
    res.send('Canot find requested page')
})

app.listen(PORT, () => {
    console.log('Listeneing on PORT ' + PORT)
})