const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb://    smartbuydb:T8h3mu7tI4CzeImHhdikSzyPgtDSC7z9XbrXLe8fyDXVcBMIA5fsNYN7Kk6udHQcw6s0eYIdrAfKACDbFKeYzw==@smartbuydb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@smartbuydb@/smartbuy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(db => console.log('db connected'))
    .catch(error => console.log(error));
