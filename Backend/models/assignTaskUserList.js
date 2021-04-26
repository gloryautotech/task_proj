const mongoose = require('mongoose')
const Schema = mongoose.Schema

let assignTaskUserListSchema = new Schema({
    assignUserEmail: {
        type: String
    },
    assignBy: {
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
},{ collection: 'assignTaskUserList' })

mongoose.model('assignTaskUserList',assignTaskUserListSchema)