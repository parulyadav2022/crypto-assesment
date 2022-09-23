// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// require('dotenv').config();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/', require('./route/route.js'));

// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
//     .then(() => { app.listen(process.env.PORT || 4000, () => console.log(`Connected`)) });

const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const {default:mongoose} = require('mongoose');
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }))



mongoose.connect('mongodb+srv://parulyadav2022:functionup2022@cluster0.nnpfr.mongodb.net/crypto',{
    useNewUrlParser : true})

.then( () => console.log("Mongodb is connected"))
.catch( err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function()  {
    console.log('Express app running on Port' + (process.env.PORT || 3000))
});