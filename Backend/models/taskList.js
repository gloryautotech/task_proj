const mongoose = require('mongoose')
const Schema = mongoose.Schema

let taskListSchema = new Schema({
    technologyListId: {
        type: String,
    },
    taskName: {
        type: String,
        default: 'default name'
    },
    tasDescription: {
        type: String,
        default: 'default name'
    },
    created: {
        type: Date,
        default: Date.now
    },
    lasrModified: {
        type: Date,
        default: Date.now
    }
},{ collection: 'taskList' })

mongoose.model('taskList',taskListSchema)