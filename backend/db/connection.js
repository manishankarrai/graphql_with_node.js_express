const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/graphql')
.then(()=> console.log(" db connection successfull ......."))
.catch(err => console.log(err));