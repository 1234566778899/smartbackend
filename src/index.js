const express = require('express')
const app = express();
const cors = require('cors')
require('./models/db')
app.use(express.json());
const port = process.env.PORT || 4000;

app.use(cors({
    origin: ['https://smartbuy-fronted.vercel.app', 'http://localhost:3000'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('v.1.0.5')
})

app.use('/user', require('./routes/User'));
app.use('/quotation', require('./routes/Quotation'));

app.listen(port, () => {
    console.log('server running on port: ' + port);
})