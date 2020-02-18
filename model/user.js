const mongoose = require("mongoose")
const stundentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
    },
    age: {
        type: Number,
        min: 10,
        max: 80,
    },
    sex: {
        type: String
    },
    email: String,
    hobbies: [String],
    collage: String,
    enterDate: {
        type: Date,
        default:Date.now
    }
})
const Student = mongoose.model("Student", stundentSchema)
module.exports = Student