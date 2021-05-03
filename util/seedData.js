const faker = require("faker");
const mongoose = require('mongoose')
const Hackathon = require('../database/models/hackathon')

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
            throw err
        }
    }
}

async function seedDB() {
    const uri = 'mongodb+srv://dev:NsjPxozQINSHk0Uw@authdemo.sq1b9.mongodb.net/development?retryWrites=true&w=majority'
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
            const name = faker.company.companyName() + " " + "Hackathon";
            const description = faker.lorem.paragraphs();
            const startDate = faker.date.future();
            const endDate = faker.date.future();
            // const organizerId = i % 2 === 0 ? "608dbf1790e6fb091649bcdf" : "608dc95d39c6d00cee36ae2b"
            const organizerId = "608dbf1790e6fb091649bcdf" 

            const newHackathon = new Hackathon({
                name: name,
                description: description,
                organizer_id: organizerId,
                start_date: startDate,
                end_date: endDate
            })
            data.push(newHackathon)
        };
        await map(data)

        // setTimeout(() => {
            
        // }, 4000)
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