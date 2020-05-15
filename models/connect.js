//构建数据库
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('success');
}).catch(() => {
  console.log('error');
})