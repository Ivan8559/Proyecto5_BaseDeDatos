require ('dotenv').config()

require ("./models/user.model") //parte 2
const cors=require('cors') // parte 3
const userRoutes = require('./routes/User.routes') //parte 2

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI + 'tienda') //Se conecta a DB y se crea DB tienda

const express = require('express')
const app = express()

const port = process.env.PORT 
const corsOptions={ //parte 3
    origin:process.env.FRONTEND_URL,
    optionsSuccessStatus:200

}
//no se usa el const port = 6000. 
//Una vez creada la carpeta models con el user.model.js no es necesario mandar informacion desde este index
// const User = mongoose.model('user',{
//     username: String,
//     password: String,
// })
app.use(cors(corsOptions))
app.use(express.json()) //parte 2 
app.use('/users', userRoutes) // parte 2 redireccionamiento a archivo User.routes

//  en le postman agregar http://localhost:6000/ y le agregas peticiones (get, post, put o delete)
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: `ruta GET` 
    })
})

app.post('/', (req, res) => { //Una vez creada la carpeta models con el user.model.js no es necesario mandar informacion desde este index
    // const ivan = new User({
    //     username: 'ivandm',
    //     password: 'ivandm',
    // })
    // ivan.save() 
    res.status(200).json({
        mensaje: `ruta POST`, detail: '' //Antes decia ivan. puedes cambiar los ivan por newUser
    })
})

app.put('/', (req, res) => {
    res.status(200).json({
        mensaje: `ruta PUT` 
    })
})

app.delete('/', (req, res) => {
    res.status(200).json({
        mensaje: `Ruta DELETE` 
    })
})


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})