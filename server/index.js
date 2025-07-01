const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ecom-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


app.get('/',(req,res)=>{
    res.send('Welcome to the API');
})

app.get('/api/dashboard',auth,(req,res)=>{
    console.log('Dashboard API accessed');
    res.send('Dashboard API');
})

app.use('/auth',authRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
