const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userDataSchema = new Schema({
    userFirstName: {
        type: String,
        default: 'default name'
    },
    userLastName: {
        type: String,
        default: 'default name'
    },
    email: {
        type: String,
        default:'present'
    },
    phone: {
        type: String,
        default:'present'
    },
    password: {
        type: String,
        default:'present'
    },
    gender: {
        type: String,
        default:'present'
    },
    userType: {
        type: String,
        default:'admin'
    },
    dateOfBirth: {
        type: Date,
        default:'present'
    },
    organizationName: {
        type: String,
        default:'present'
    },
    created: {
        type: Date,
        default: Date.now
    },
    lasrModified: {
        type: Date,
        default: Date.now
    }
},{ collection: 'userData' })

mongoose.model('userData',userDataSchema)
module.exports= {
    userData:userDataSchema
}