const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');

var port = 2000;

var app = express({defaultErrorHandler:false});

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ano11307001',
    database:'moviebertasbih',
    port: 2000
});


app.get('/', (req,res) => {
    res.send('<h1>Ini Homepage</h1>')   
})

//backend tablekamar dimulai
//read data list kamar
app.get('/listkamar' , (req,res) => {
    var sql = 'select * from hotelbertasbih.kamar;'
    conn.query(sql, (err, result)=>{
        res.send(result)
        console.log(result)
    })
})

//edit data list kamar
app.post('/kamaredit/:id',(req,res)=>{
    var editKamar = req.body
    var sql = `update kamar? where id=${req.params.id}`;
    conn.query(sql, editKamar, (err, result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete data kamar dan connection
app.post('/kamardelete/:id',(req,res)=>{
    var sql = `delete from list where id=${req.params.id}`;
    conn.query(sql, (err, result)=>{
        res.send(result)
    })
    var sql2 = `delete from category kamar where idmovie=${req.params.id}`;
    conn.query(sql2, (err, results)=>{
        console.log(results)
    })
})

//create data kamar
app.post('/kamaradd',(req,res)=>{
    var addKamar = req.body
    var sql = `insert into movies set ?`;
    conn.query(sql, addKamar, (err, result)=>{
        res.send(result)
        console.log(result)
    })
})

//akhir backend tablekamar

//tablecategory dimulai
//add category
app.post('/categoryadd',(req,res)=>{
    var addCategories = req.body
    var sql = `insert into categories set?`;
    conn.query(sql, addCategories, (err, result)=>{
        res.send(result)
        console.log(result)
    })
})

//edit category
app.post('/categoryedit/:id',(req,res)=>{
    var editCategory = req.body
    var sql = `update category set? where id=${req.params.id}`;
    conn.query(sql, editCategory,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//read data category
app.get('/categorylist' , (req,res) => {
    var sql = 'select * from hotelbertasbih.tablecategory;'
    conn.query(sql, (err, result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete data category
app.post('/categorydelete/:id',(req,res)=>{
    var sql = `delete from category where id=${req.params.id}`;
    conn.query(sql, (err, result)=>{
        res.send(result)
        console.log(result)
    })
    var sql2 = `delete from category kamar where idcategory=${req.params.id}`;
    conn.query(sql2, (err, results)=>{
        console.log(results)
    })
})
//akhir backend tablecategory

app.listen(port, () => console.log('API Aktif di port ' + port))