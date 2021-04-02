const mongoose = require('mongoose')
const Schema = mongoose.Schema

let technologyListSchema = new Schema({
    technologyType: {
        type: String,
        default: 'default name'
    },
    technologyName: {
        type: String,
        default: 'default name'
    },
    technologyLevel: [{
        id : String,
        level : String
         }],
    created: {
        type: Date,
        default: Date.now
    },
    lasrModified: {
        type: Date,
        default: Date.now
    }
},{ collection: 'technologyList' })

mongoose.model('technologyList',technologyListSchema)