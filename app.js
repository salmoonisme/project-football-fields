const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path')
const mongoose = require('mongoose');
const Football = require('./models/football');


mongoose.connect('mongodb://localhost:27017/football-field', {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
    console.log('Database connected')
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
});
app.get('/makefootballfield', async (req, res) => {
    const field = new Football ({title: 'my backyard'});
    await field.save();
    res.send(field);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})