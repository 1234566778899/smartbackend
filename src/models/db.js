const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb+srv://61126863:sA7JJdOGJv4ukfl0@cluster0.iyqbg9l.mongodb.net/smartbuy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(db => console.log('db connected'))
    .catch(error => console.log(error));
