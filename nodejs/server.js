const express = require('express');
const{errorHandler} = require('./errorMiddleware');
const router = require('./route');
//const mongoose = require('mongoose');

//db
const app = express();

//const mongDb = "mongodb+srv://jay:jay@cluster0.9ntntfb.mongodb.net/toDoList?retryWrites=true&w=majority";

// mongoose.connect(mongDb,{useNewUrlParser: true, useUnifiedTopology: true })

// const db = mongoose.connection;

const port = 5000;


app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use('/api',router);



// app.use(connectDb);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });