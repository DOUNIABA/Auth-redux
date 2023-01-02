
const express=require('express')
const app=express()
const db=require('./config/db')
const cors=require('cors')
const auth= require('./router/routes/Auth')
const commands= require('./router/routes/CommandRoutes')
const users= require('./router/routes/UserRoutes')
const plats= require('./router/routes/PlatRoutes')
const payments= require('./router/routes/PaymentRoutes')
const categorie= require('./router/routes/CategorieRoutes')
const Achat= require('./router/routes/AchatRoutes')
const products = require('./products')

app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public',express.static('public'))

app.use('/api/auth',auth)
app.use('/api/command',commands)
app.use('/api/user',users)
app.use('/api/plat',plats)
app.use('/api/payment',payments)
app.use('/api/categorie',categorie)
app.use('/api/achat',Achat)

app.get("/products", (req, res) => {
    res.send(products);
});

app.listen(8080);

module.exports= app
