//article model
const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  introduce: { type: String },
  category: { type: String, required: true },
  // comments: [{ body: String, date: Date }],
  time: { type: String }
})
module.exports = mongoose.model('Article', ArticleSchema)