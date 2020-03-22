const express = require('express')
const path = require('path')
const multer = require('multer');
const hbs = require('hbs')
// const upload = multer({dest: __dirname + '/uploads/images'});
const client = require('./db/mongo')
const sharp = require('sharp')
const mongo = require('mongodb')

const app = express()

const publicPath = path.join(__dirname,'/public')
const viewPath = path.join(__dirname,'/templates/views')
const partilasPath = path.join(__dirname,'/templates/partials')

hbs.registerPartials(partilasPath)

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(publicPath))
app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('', (req,res) => {
    res.render('index')
})

app.get('/home', (req,res) => {
    res.render('home')
})
app.get('/news', (req,res) => {
    res.render('news')
})
app.get('/calculate', (req,res) => {
    res.render('calculate')
})


// app.post('/upload', upload.single('photo'), (req, res) => {
//     if(req.file) {
//         res.json(req.file);
//     }
//     else throw 'error';
// });


app.get('/news', (req, res) => {
    res.render('news.html')
});

const upload = multer({
    // dest : 'avatars', if we dont mention dest here then we can access uploaded file in router 
    // through req.file.buffer
     limits : {
         fileSize : 1000000 // 1000000 means 1mb
     },
     fileFilter(req,file,cb) {
         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
             return cb(new Error('Please upload proper format of avatar'))
         }
         cb(undefined,true)
     }
 })
 
 // Express not supports file upload so using multer for that
 app.post('/users/me/avatar', upload.single('photo') , async (req, res) => {
     // req.user.avatar = req.file.buffer
     const buffer = await sharp(req.file.buffer).resize({width:250,height:250})
                                                 .png()
                                                 .toBuffer()
    console.log('users/me/avatar')
    const collection = client.db("test").collection("Users");
    collection.insertMany([{name:"Prasad with image",image:buffer}], (err,res) => {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
    })

    // dbo.collection("customers").insertMany(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("Number of documents inserted: " + res.insertedCount);
    //     db.close();
    //   });
    res.status(200).send("inserted")
 },(error,req,res,next)=>{
     res.status(400).send({error:error.message})
 })

 app.get('/image/:id', (req,res) => {
     const id = "5e773a326d789d15544bc549"  // req.params.id;
    //  res.set('Content-Type','image/jpg') //application/json
    //  res.send(user.avatar)
    var o_id = new mongo.ObjectID(id);
     const collection = client.db("test").collection("Users");
     collection.findOne({_id:o_id}, (err,result) => {
         if (err) throw err
         if (result) {
            let imageData = JSON.stringify(result.image)
            /* removing the double quotes at first and last positions */
            imageData = imageData.replace(/"/g,"")
            // let html = `<img src="data:image/jpg;base64,${imageData}">`
            // res.send(html)
             res.render('news', {
                 data: imageData
                //  data: JSON.stringify(result.image)
             })
            // res.send(result.image)
         }
        //  res.send(JSON.stringify(result))
     })
 })


app.get('/*', (req,res) => {
    res.send('Canot find requested page')
})

app.listen(PORT, () => {
    console.log('Listeneing on PORT ' + PORT)
})



