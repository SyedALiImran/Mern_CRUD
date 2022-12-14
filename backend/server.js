const path = require('path');
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./confiq/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/userGoalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//serve frontend

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html'))
    })
}else{
    app.get('/',(req,res)=>{
        res.send('plz set to production')
    })
}
app.use(errorHandler);

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
