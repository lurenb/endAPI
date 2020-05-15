// Category model

const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
})
//导出
module.exports = mongoose.model('Comment', CommentsSchema)

