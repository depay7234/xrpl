const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();
const cors = require("cors")

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const hotelRouter =require("./Route/hotelRoute");
const attractionRouter =require("./Route/attractionRoute");
const userRouter = require('./Route/userRoute')



app.use(process.env.hotelRouter,hotelRouter)
app.use(process.env.attractionRouter,attractionRouter)

app.use(process.env.userRouter, userRouter)




module.exports = app