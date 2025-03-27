require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
    dbConnect: async () => {
        try {
            await mongoose.connect(process.env.Mongo_Url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }
}