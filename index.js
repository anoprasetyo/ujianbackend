const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var port = 2000;
var app = express({defaultErrorHandler:false});
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))

const mysql = require('mysql')

const conn = mysql.createConnection({
    host:'localhost',
    user: 'apriano',
    password:'@Apriano11307001',
    database:'maxxCorner',
    port:3306 
});
app.get('/', (req,res)=>{
    res.send("<h1>jalan</h1>")
})

//user
app.get('/users' , (req, res) => {
    var sql = 'select * from users;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})  

app.post('/register' , (req, res) => {
    var newUsers = req.body
    var sql =`insert into users set ?`
    conn.query(sql ,newUsers,(err,result)=>{
        console.log(result)
        res.send(result)
    })
})

app.post('/edit-profile/:id', (req, res) => {
    var editUser = req.body
    var sql = `update users set ? where id = ${req.params.id}`
    conn.query(sql, editUser,(err,result)=>{
        res.send(result)
    })
})

app.post('/delete-user/:id', (req, res) => {
    var sql = `delete from users where id = ${req.params.id}`
    conn.query(sql, (err,result)=>{
        res.send(result)
    })
})

//ambil data product
app.get('/popok' , (req, res) => {
    var sql = 'select * from products;'
    conn.query(sql ,(err,result) => {
        console.log(result)
        res.send(result)
    })
})

app.post('/popok-insert' , (req, res) => {
    var newProduct = req.body
    var sql =`insert into products set ?`
    conn.query(sql ,newProduct,(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.post('/popok-edit/:id', (req, res) => {
    var editProducts =req.body
    var sql = `update products set ? where id_products=${req.params.id}`
    conn.query(sql, editProducts, (err, result) => {
        res.send(result)
    })
})

app.post('/popok-delete/:id', (req, res) => {
    var sql = `delete from products where id_products = ${req.params.id}`
    conn.query(sql, (err, result) => {
        res.send(result)
    })
})

//ambil data categories
app.get('/categories' , (req, res) => {
    var sql = 'select * from categories;'
    conn.query(sql ,(err,result) => {
        console.log(result)
        res.send(result)
    })
})

app.post('/categories-insert' , (req, res) => {
    var newCategories = req.body
    var sql =`insert into products set ?`
    conn.query(sql ,newCategories,(err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.post('/categories-edit/:id', (req, res) => {
    var editCategories =req.body
    var sql = `update products set ? where id_products=${req.params.id}`
    conn.query(sql, editCategories, (err, result) => {
        res.send(result)
    })
})

app.post('/categories-delete/:id', (req, res) => {
    var sql = `delete from products where id_products = ${req.params.id}`
    conn.query(sql, (err, result) => {
        res.send(result)
    })
})

//connect movies dan categories
app.post('/movies-categories', (req, res) => {
    var newCart = req.body
    var sql =`insert into cart set ?`
    conn.query(sql, newCart, (err, result) => {
        console.log(result)
        res.send(result)
    })
})

app.post('/movies-categories-edit/:id', (req, res) => {
    var newChart =req.body
    var sql = `update cart set ? where id_cart= ${req.params.id}`
    conn.query(sql, newChart, (err, result) => {
        res.send(result)
        console.log(result)
    })
})

app.post('/movies-categories-delete/:id', (req, res) => {
    var sql = `delete from cart where id_cart = ${req.params.id}`
    conn.query(sql, (err, result) => {
        res.send(result)
        console.log(result)
    })
})

app.get('/movies-categories', (req, res) => {
    var sql = 'select us.username as username, pr.nama as nama, pr.harga as harga from cart ch join users us on ch.id_user = us.id join products pr on ch.id_products = pr.id_products '
    conn.query(sql ,(err,result) => {
        console.log(result)
        res.send(result)
    })
})

app.listen(port, () => console.log('API Aktif di port ' + port))