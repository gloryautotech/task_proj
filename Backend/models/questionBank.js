const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionBank = new Schema({
    questionBankType: {
        type: String
    },
    questionBankQuestion: {
        type: String
    },
    questionBankOption: {
        type: Boolean 
    },
    questionBankAnswer: {
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
},{ collection: 'questionBank' })

mongoose.model('questionBank',questionBank)

let questionBankOption = new Schema({
    questionBankId: {
        type: String
    },
    questionBankAnswerOption: {
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
},{ collection: 'questionBankOption' })

mongoose.model('questionBankOption',questionBankOption)