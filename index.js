//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const exphbs = require('express-handlebars');
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mongoose = require('mongoose');
const { Date } = require('mongoose');
const { Console } = require('console');
var ObjectId = require('mongodb').ObjectID;
const app = express();

//konfigurasi koneksi

 
//connect ke database


 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/crud_db',{useNewUrlParser: true, useUnifiedTopology: true},(err) =>{ 
  if(err) throw err;
  console.log('MongoDB Connected...');
});

var Schema = mongoose.Schema;

var mahasiswa = new Schema({
      npm: {
          type: String
      },
      nama: {
        type: String
      },
      tempat_lahir: {
        type: String
      },
      tanggal_lahir: {
        type: Date
      },
      jenis_kelamin: {
        type: String
      },
      agama: {
        type: String
      },
      alamat: {
        type: String
      },
      no_telepon: {
        type: String
      },
});
const crud = mongoose.model('crud',mahasiswa);

function insertmahasiswa(req,res) {
    var insert = new crud();

    insert.npm = req.body.npm;
    insert.nama = req.body.nama;
    insert.tempat_lahir = req.body.tempat_lahir;
    insert.tanggal_lahir = req.body.tanggal_lahir;
    insert.jenis_kelamin = req.body.jenis_kelamin;
    insert.agama = req.body.agama;
    insert.alamat = req.body.alamat;
    insert.no_telepon = req.body.no_telepon;
    insert.save((err, doc) =>{
        if (!err) {
            res.redirect('/');
        }
        else{
            console.log('gagal');
        }
    });
}

function updatemahasiswa(req,res){
 
    crud.findOneAndUpdate({npm: req.body.npm}, req.body, {new: true}, { useFindAndModify: false }, (err,doc) =>{
        if (!err) {
            res.redirect('/');
        }
        else
            throw err;
    });
}

function deletemahasiswa(req,res){

    crud.findOneAndDelete({npm: req.body.npm}, { useFindAndModify: false }, (err,doc) => {
        if(!err){
          res.redirect('/');
        }
        else  
            throw err;
    });
}



//route untuk insert data
app.post('/save',(req, res) => {
    insertmahasiswa(req,res);
});


//route untuk update data
app.post('/update',(req, res) => {
  updatemahasiswa(req,res);
});

//route untuk delete data
app.post('/delete',(req, res) => {
  deletemahasiswa(req,res);
});


 
//route untuk homepage
app.get('/',(req, res) => {
    crud.find((err, docs) => {
        if (!err) {
            res.render('product_view', {
                list: docs
            });
        }
        else{
            console.log('error');
        }
    });
});


// // app.get('/search',function(req,res){
// //   connection.query('SELECT nama from mahasiswa where nama like "%'+req.query.key+'%"', function(err, rows, fields) {
// //       if (err){console.log(err)};
// //       var data=[];
// //       for(i=0;i<rows.length;i++)
// //         {
// //           data.push(rows[i].nama);
// //         }
// //         res.end(JSON.stringify(data));
// //     });
// //   });

 

 

 

 
//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});