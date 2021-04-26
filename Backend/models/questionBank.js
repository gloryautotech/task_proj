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
    questionOption:{
        type: Array
    },
    questionLevel: {
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


// ,{ collection: 'questionBankOption' })

// mongoose.model('questionBankOption',questionBankOption)