const mongoose = require('mongoose')
const Schema = mongoose.Schema

let assignTaskSchema = new Schema({
    userId: {
        type: String
    },
    emailIdOfReceiver: {
        type: String
    },
    assignTaskId: {
        type: String
    },
    assignTaskStatus: {
        type: String
    },
    assignTaskVerifiedStatus: {
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
},{ collection: 'assignTask' })

mongoose.model('assignTask',assignTaskSchema)