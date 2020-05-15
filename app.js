const express = require('express')
const session = require('express-session')
var cookieParser = require('cookie-parser')
const app = express()
// const formidable = require('formidable');
// app.use(require('cors')()) //引入第三方插件解决跨域问题
app.use(express.json()) //识别客户端提交的json数据

//连接数据库
require('./models/connect')

//数据集合引入
const Article = require('./models/article');
const Category = require('./models/category');
const Comment = require('./models/comment');
// const User = require('./models/User');
const Diary = require('./models/diary');
//实现跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("ACCESS-Control-Allow-Headers", "Content-Type");
  //  允许客户端发送跨域请求时携带cookie信息
  res.header('Access-Control-Allow-Credentials', 'true');
  next()
}),
  app.use(cookieParser());
app.use(session({
  name: 'logintext',
  secret: 'xiangshema',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 //过期时间设置
  }
}))

//登陆
app.post('/api/login', async (req, res) => {
  const { userName, password } = req.body
  if (userName == '123123' && password == '123123') {
    req.session.username = userName
    res.send({ error: 0 })
  } else {
    res.send({ error: 1 })
  }
})
//登陆验证
app.get('/api/userid', (req, res) => {
  if (req.session.username) {
    res.send({
      code: 200
    })
    return
  } else {
    res.send({
      code: 400
    })
  }
})

//显示文章列表
app.get('/api/articlesAll', async (req, res) => {
  const articles = await Article.find().sort({ _id: -1 })
  res.send(articles)
})
//查询blog分类
app.get('/api/category', async (req, res) => {
  const category = await Category.find().sort({ _id: -1 })
  res.send(category)
})
//查询随记列表
app.get('/api/diary', async (req, res) => {
  const diary = await Diary.find().sort({ _id: -1 })
  res.send(diary)
})
//显示文章除内容外的列表
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find({}, '-content').sort({ _id: -1 })
  res.send(articles)
})
//新增文章
app.post('/api/articles', async (req, res) => {
  const article = await Article.create(req.body)
  res.send({
    status: 1
  })
})
//删除文章
app.delete('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.send({
    status: 1
  })
})
//文章详情
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.send(article)
})
//修改文章
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send(article)
})

//删除blog分类
app.delete('/api/category/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
  res.send({
    status: 1
  })
})
//新建blog分类
app.post('/api/category', async (req, res) => {
  await Category.create(req.body)
  res.send({
    status: 1
  })
})
//新建一篇随记
app.post('/api/diary', async (req, res) => {
  await Diary.create(req.body)
  res.send({
    status: 1
  })
})
//删除随笔
app.delete('/api/diary/:id', async (req, res) => {
  await Diary.findByIdAndDelete(req.params.id)
  res.send({
    status: 1
  })
})
//博客分页详情
app.get('/api/blogpage/:page', async (req, res) => {
  let correntpage = req.params.page;
  let skipitems = (correntpage - 1) * 5
  const articles = await Article.find().sort({ _id: -1 }).skip(skipitems).limit(5)
  res.send(articles)
})
//博客类型分页
app.get('/api/blogpagetype', async (req, res) => {
  let correntpage = req.query.page;
  let category = req.query.type
  let skipitems = (correntpage - 1) * 5
  const articles = await Article.find({ 'category': category }).sort({ _id: -1 }).skip(skipitems).limit(5)
  res.send(articles)
})
//返回博客总页数
app.get('/api/totalpage', async (req, res) => {
  let count = await Article.countDocuments({})
  res.send(count)
})
//类型总页数
app.get('/api/totalpagetype/:type', async (req, res) => {
  let category = req.params.type
  let count = await Article.find({ 'category': category }).countDocuments({})
  res.send(count)
})
//日记总页数
app.get('/api/diarypage', async (req, res) => {
  let count = await Diary.countDocuments({})
  res.send(count)
})
//日记分页详情
app.get('/api/diarypage/:page', async (req, res) => {
  let correntpage = req.params.page;
  let skipitems = (correntpage - 1) * 5
  const diary = await Diary.find().sort({ _id: -1 }).skip(skipitems).limit(5)
  res.send(diary)
})
//模糊查询
app.get('/api/search/:content', async (req, res) => {
  const content = req.params.content;
  const article = await Article.find({ "title": { $regex: content } }).sort({ _id: -1 })
  if (article.length == 0) {
    res.send(0)
  } else {
    res.send(article)
  }
})
//添加评论
app.post('/api/comments', async (req, res) => {
  await Comment.create(req.body)
  res.send({
    status: 1
  })
})
//获取评论
app.get('/api/comments', async (req, res) => {
  const comments = await Comment.find().sort({ _id: -1 })
  res.send(comments)
})
//删除评论
app.delete('/api/comments/:id', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id)
  res.send({
    status: 1
  })
})
app.listen(3000, () => {
  console.log('3000');
})
