const faker = require("faker");
const mongoose = require('mongoose')
const Hackathon = require('../database/models/hackathon')
require('dotenv').config()

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const map = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        try {
            await item.save()
        }
        catch (err) {
            console.log('err here')
        }
    }
}

const images = [
    'https://images.unsplash.com/photo-1593640475673-e2454e28d27c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTg3NzY4&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1610433572201-110753c6cff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTg3NzA3&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1554306274-f23873d9a26c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTg3ODcz&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1610576660726-1b2704ee0550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTg3ODY4&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
]

async function seedDB() {
    const uri = null;
    const config = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    }

    try {
        await mongoose.connect(uri, config)
        console.log("Connected correctly to server");
        const collection = mongoose.connection.db.collection('hackathons');
        collection.drop();

        const data = [];
        for (let i = 0; i < 20; i++) {
            const three = i % 3 === 0;
            const five = i % 5 === 0;
            const even = i % 2 === 0;

            const name = faker.company.companyName() + " " + "Hackathon";
            const description = faker.lorem.paragraphs();
            const startDate = three ? faker.date.soon() : five ? faker.date.past() : faker.date.future();
            const endDate = faker.date.between(startDate, faker.date.future());
            const organizerId = even ? "608dbf1790e6fb091649bcdf" : "608dc95d39c6d00cee36ae2b"
            const image = images[(i%4)]

            const newHackathon = new Hackathon({
                name: name,
                description: description,
                organizer_id: organizerId,
                start_date: startDate,
                end_date: endDate,
                image: image
            })
            data.push(newHackathon)
        };
        await map(data)
        mongoose.connection.close();
        console.log('--Connection closed--')
        console.log("Database seeded! :)");

    } catch (err) {
        console.log(err.stack);
    }

}

seedDB()

module.exports = {
    seedDB
}