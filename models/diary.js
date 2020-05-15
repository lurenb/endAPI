// diary model
const mongoose = require('mongoose')

const DiarySchema = new mongoose.Schema({
  content: { type: String, required: true },
  time: { type: String }
  // slug: { type: String, required: true },
  // created: { type: Date }
})

module.exports = mongoose.model('Diary', DiarySchema)