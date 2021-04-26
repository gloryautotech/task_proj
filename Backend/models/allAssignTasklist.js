const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionBankSchema = new Schema({
    questionId:String
})

const submitAnswerListSchema = new Schema({
    questionid:String,
    answer:String
})

let allAssignTaskListSchema = new Schema({
    assignTaskUserListId: {
        type: String
    },
    questionBankList: [questionBankSchema],
    assignTaskId: {
        type: String
    },
    isSubmit: {
        type: Boolean
    },
    answer: [submitAnswerListSchema],
    created: {
        type: Date,
        default: Date.now
    },
    lasrModified: {
        type: Date,
        default: Date.now
    }
},{ collection: 'allAssignTaskList' })

mongoose.model('allAssignTaskList',allAssignTaskListSchema)