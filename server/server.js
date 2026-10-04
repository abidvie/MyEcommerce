


const express=require('express')
const mongoose=require('mongoose')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const app=express()
const port=process.env.PORT ||5000;
const authRoutes=require('./routers/auth/auth_routes')

mongoose.connect('mongodb+srv://sarkerdipto2055_db_user:7i3cr1Hjir9SUGNG@cluster0.zhurqsk.mongodb.net').then(()=>{
    console.log('connected to mongodb') 
}).catch((err)=>{
    console.log('not connected to mongodb')
})


app.get('/',(req,res)=>{
    res.send('hello abid')}
)



app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization','Cache-Control','Pragma','Expires'],
        credentials: true,
    })
)

app.use(cookieparser());
app.use(express.json());
app.use('/api/auth',authRoutes);


app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})
