const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect(process.env.REACT_APP_MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => { console.log("connected to mongo successfully") }
    ).catch(
        () => { console.log("connection error...") }
    )
}

module.exports = connectToMongo