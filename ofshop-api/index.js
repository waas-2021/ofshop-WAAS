const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { response } = require('express');

const app = express();
app.use(cors());
app.use(bodyparser.json());

//conectar con la bd
const db = mysql.createConnection({
    host:'localhost',
    user:'root',//cambiar por usuario de db
    password: '#Gasca731572',//cambiar por contraseña de db
    database:'ofshop',
    port:3306
});

//comprobar conexion
db.connect(error => {
    if(error){
        console.log("!error db!");
        console.log(error);
        console.log("¡error db¡");
    }
    console.log("db conectada");
});

/* usuarios */
//obtener todos los usuarios
app.get('/usuarios',(req,res)=>{
    console.log('get usuarios');
    let query = 'select * from usuario';
    db.query(query,(error,result)=>{
        if(error){
            console.log("!error get usuarios!");
            console.log(error);
            console.log("¡error get usuarios");
        }
        if(result.length > 0){
            res.send({
                message:'get usuarios',
                data: result
            });
        } else {
            res.send({
                message:'Sin datos',
                data: result
            });
        }
    });
});

//obtener un usuario por su id
app.get('/usuario/:id',(req,res)=>{
    let idUsuario = req.params.id;
    console.log('get usuario ' + idUsuario);
    let query = 'select * from usuario where id = ?';
    db.query(query,[idUsuario],(error,result)=>{
        if(error){
            console.log("!error get usuario!");
            console.log(error);
            console.log("¡error get usuario");
        }
        if(result.length > 0){
            res.send({
                message:'get usuario ' + idUsuario,
                data: result
            });
        } else {
            res.send({
                message:'Sin datos',
                data: result
            });
        }
    });
});

//crear un usuario
app.post('/usuario',(req,res)=>{
    console.log("post usuario");
    console.log(req.body);
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;
    let usuario = req.body.usuario;
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;
    let value = [[nombres,apellidos,usuario,correo,contrasena]];
    let query =  'insert into usuario(nombres,apellidos,usuario,correo,contrasena) values ?';
    db.query(query, [value], (error,result)=>{
        if(error){
            console.log("!error post usuarios!");
            console.log(error);
            console.log("¡error post usuarios");
        }
        console.log(result);
        if(result.affectedRows > 0 && result.insertId > 0){
            res.send({
                message:'post usuario',
                data: result
            });
        } else {
            res.send({
                message:'Sin datos',
                data: result
            });
        }
    });
});

//editar un usuario
app.put('/usuario/:id',(req,res)=>{
    let idUsuario = req.params.id;
    console.log("put usuario " + idUsuario);
    console.log(req.body);
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;
    let usuario = req.body.usuario;
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;
    let query =  'update usuario set nombres = ? , apellidos = ?, usuario = ?, correo = ?, contrasena = ? where id = ?';
    db.query(query, [nombres, apellidos, usuario, correo, contrasena, idUsuario], (error,result)=>{
        if(error){
            console.log("!error put usuarios!");
            console.log(error);
            console.log("¡error put usuarios");
        }
        console.log(result);
        if(result.affectedRows > 0 && result.changedRows > 0){
            res.send({
                message:'put usuario',
                data: result
            });
        } else {
            res.send({
                message:'Sin datos',
                data: result
            });
        }
    });
});

//eliminar un usuario
app.delete('/usuario/:id',(req,res)=>{
    let idUsuario = req.params.id;
    console.log("delete usuario " + idUsuario);
    let query =  'delete from usuario where id = ?';
    db.query(query, [idUsuario], (error,result)=>{
        if(error){
            console.log("!error delete usuarios!");
            console.log(error);
            console.log("¡error delete usuarios");
        }
        console.log(result);
        if(result.affectedRows > 0){
            res.send({
                message:'delete usuario',
                data: result
            });
        } else {
            res.send({
                message:'Sin datos',
                data: result
            });
        }
    });
});
/* usuarios */

/* login */
app.get('/login',(req,res)=>{
    console.log(' login ');
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;
    let query = 'select * from usuario where trim(correo) = trim(?) and trim(contrasena) = trim(?)';
    db.query(query,[correo,contrasena],(error,result)=>{
        if(error){
            console.log("!error get login!");
            console.log(error);
            console.log("¡error get login");
        }
        if(result.length > 0){
            res.send({
                message:'get login',
                data: result
            });
        } else {
            res.send({
                message:'Sin datos',
                data: result
            });
        }
    });
});
/* login */

app.listen(3000,()=>{
    console.log('server running..');
});