const mongoose = require('mongoose')
const Schema = mongoose.Schema

let submitTaskSchema = new Schema({
    assignTaskId: {
        type: String
    },
    AnswerList: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    lasrModified: {
        type: Date,
        default: Date.now
    }
},{ collection: 'submitTask' })

mongoose.model('submitTaskSchema',submitTaskSchema)