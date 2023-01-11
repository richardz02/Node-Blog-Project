const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// set up express app
const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://richardz02:richthegoat02@node.su1nkgw.mongodb.net/node?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')

//  middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// mongoose and mango snadbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog2',
//         snippet: 'About my new blog',
//         body: 'More baout my new blog'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// retrieve blogs
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// find single blog
// app.get('/single-blog', (req, res) => {
//     Blog.findById('63bb4f204df333bfa26c9c05')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.use((req, res, next) => {
//     console.log('new request made: ')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next()
// })

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>')
    res.render('about', { title: 'About' })
})

//blog routes 
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})