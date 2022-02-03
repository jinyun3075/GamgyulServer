const express = require('express');
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./model/config');

// const postRouter = require("./routes/postRoute");
const imgRouter = require('./routes/imgRoute');
const userRouter = require('./routes/userRoute');
const profileRouter = require('./routes/profileRoute');
const postRouter = require('./routes/postRoute');
dotenv.config();

db();
const app = express();

app.use(bodyparser.urlencoded({ extended : true}))
app.use(cors());
app.use(express.json())

app.use('/image', imgRouter);
app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/post', postRouter)

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log('서버 폭발!!')
    console.log(err);
    res.sendStatus(500);
})

app.listen(8080);