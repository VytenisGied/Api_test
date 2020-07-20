const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv/config');

//Import routes
const postsRoutes = require('./routes/posts');
const todosRoutes = require('./routes/todos');

//Midleware
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoutes);
app.use('/todos', todosRoutes);

//Routes
app.get('/', (req, res) => {
    res.send('<h1>We are home</h1>');
});

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    }, () => {
    console.log('Connected to DB!');
});

app.listen(process.env.PORT || 8080, () => console.log('All is OK'));