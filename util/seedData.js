const faker = require("faker");
const mongoose = require('mongoose')
const Hackathon = require('../database/models/hackathon');
const Project = require("../database/models/project");
const User = require("../database/models/user");
require('dotenv').config()

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
    'https://images.unsplash.com/photo-1610433572201-110753c6cff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTg3NzA3&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1554306274-f23873d9a26c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTg3ODcz&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1610576660726-1b2704ee0550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTg3ODY4&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1619462571903-1ca33f7a946a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMjE4MzM4&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1611663806011-b37e091090f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMjE4Mzk0&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1616441521810-980550220bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMjE4NDE3&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1580894736036-7a68513983ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMjE4NDUx&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1616441523070-2239b6598014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMjE4NTAw&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMjE4NTI4&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMjE4NjIz&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit'
]

const projectImages = [
    'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwNjU1ODI5&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1616865609199-abb1465abf5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwNjU1OTAw&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
    'https://images.unsplash.com/photo-1620312531809-daf217b2b9d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwNjU2MDU1&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
]

async function seedDB() {
    const database = 'development'
    const uri = `mongodb+srv://dev:${process.env.MONGODB_PASSWORD}@authdemo.sq1b9.mongodb.net/${database}?retryWrites=true&w=majority`
 
    // DB URL
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

        var danglesId = '';
        var jCoolId = '';

        const update = { hackathons: [] }

        User.findOneAndUpdate({ username: 'dangles'}, update, async(err, result) => {
            if (err) console.log(err)
            else {
                danglesId = result._id
                await callback(danglesId, images.slice(0, 5))
            }
        })
        User.findOneAndUpdate({ username: 'j-cool' }, update, async(err, result) => {
            if (err) console.log(err)
            else {
                jCoolId = result._id
                await callback(jCoolId, images.slice(5))
                console.log(jCoolId)
            }
        })

        setTimeout(() => {
            mongoose.connection.close();
            console.log('--Connection closed--')
            console.log("Database seeded! :)");
        }, 15000);
    } catch (err) {
        console.log(err.stack);
    }
}

const callback = async (userId, arr) => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const three = i % 3 === 0;
        const five = i % 5 === 0;

        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
          }
        const name = faker.company.companyName() + " " + "Hackathon";
        const description = faker.lorem.paragraphs();
        const startDate = three ? faker.date.soon() : five ? faker.date.past() : faker.date.future();
        const endDate = faker.date.between(startDate, faker.date.future());
        const organizerId = userId
        const image = arr[randomIntFromInterval(0, arr.length - 1)]
    
        const newHackathon = new Hackathon({
            name: name,
            description: description,
            organizer_id: organizerId,
            start_date: startDate,
            end_date: endDate,
            image: image,
            participants: randomIntFromInterval(0, 400)
        })
        data.push(newHackathon)
    };
    await map(data)
}

seedDB()

module.exports = {
    seedDB
}