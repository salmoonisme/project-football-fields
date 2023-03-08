const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./dataSeed');
const Football = require('../models/football');

mongoose.connect('mongodb://localhost:27017/football-field', {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Football.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000);
        const seed = new Football ({
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await seed.save();
        console.log(seed);
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});