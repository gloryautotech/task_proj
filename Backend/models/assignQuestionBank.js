const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionBankSchema = new Schema({
    questionId:String
})
let assignQuestionListSchema = new Schema({
    assignUserEmail: {
        type: String
    },
    questionBankList: [questionBankSchema],
    isSubmit: {
        type: Boolean,
        default: false
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
},{ collection: 'assignQuestionList' })

mongoose.model('assignQuestionListSchema',assignQuestionListSchema)