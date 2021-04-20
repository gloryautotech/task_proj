const mongoose = require('mongoose')
const Schema = mongoose.Schema

const submitAnswerListSchema = new Schema({
    questionId:String,
    answer:String
})
let submitAnswerSchema = new Schema({
    assignQuestionUserId: {
        type: String
    },
    AnswerList: [submitAnswerListSchema],
    created: {
        type: Date,
        default: Date.now
    },
    lasrModified: {
        type: Date,
        default: Date.now
    }
},{ collection: 'submitAnswer' })

mongoose.model('submitAnswerSchema',submitAnswerSchema)