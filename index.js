//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
 
//konfigurasi koneksi
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mahasiswa'
});
 
//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));
 
//route untuk homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM mahasiswa";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results
    });
  });
});


// app.get('/search',function(req,res){
//   connection.query('SELECT nama from mahasiswa where nama like "%'+req.query.key+'%"', function(err, rows, fields) {
//       if (err){console.log(err)};
//       var data=[];
//       for(i=0;i<rows.length;i++)
//         {
//           data.push(rows[i].nama);
//         }
//         res.end(JSON.stringify(data));
//     });
//   });

 
//route untuk insert data
app.post('/save',(req, res) => {
  let data = {npm: req.body.npm, nama: req.body.nama, tempat_lahir: req.body.tempat_lahir, tanggal_lahir: req.body.tanggal_lahir, jenis_kelamin: req.body.jenis_kelamin, agama: req.body.agama, alamat: req.body.alamat, no_telepon: req.body.no_telepon};
  let sql = "INSERT INTO mahasiswa SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route untuk update data
app.post('/update',(req, res) => {
  let sql = "UPDATE mahasiswa SET nama='"+req.body.nama+"', tempat_lahir='"+req.body.tempat_lahir+"', tanggal_lahir='"+req.body.tanggal_lahir+"', jenis_kelamin='"+req.body.jenis_kelamin+"', agama='"+req.body.agama+"', alamat='"+req.body.alamat+"', no_telepon='"+req.body.no_telepon+"' WHERE npm="+req.body.npm;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route untuk delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM mahasiswa WHERE npm="+req.body.npm+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
 
//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});