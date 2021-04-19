const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userDataSchema = new Schema({
    userFirstName: {
        type: String,
        default: ''
    },
    userLastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default:''
    },
    phone: {
        type: String,
        default:''
    },
    password: {
        type: String,
        default:''
    },
    gender: {
        type: String,
        default:''
    },
    userType: {
        type: String,
        default:'admin'
    },
    dateOfBirth: {
        type: Date,
        default:''
    },
    organizationName: {
        type: String,
        default:''
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