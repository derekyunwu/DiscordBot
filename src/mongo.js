const mongoose = require("mongoose")

module.exports = async () => {
    await mongoose.connect(process.env.MONGO_REMOTE_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return mongoose
}