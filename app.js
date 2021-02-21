const express = require('express');
const mysql = require('mysql');

const db = require('./util/database');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})





//Routes

app.get('/', (req,res)=>{

    res.send('La API Funciona');

})

app.get('/voluntarios', (req,res)=>{
    
    const sql = "SELECT * FROM usuarios where roles_id = 2";

    connection.query(sql,(error,results)=>{
        console.log(results);
        if(error) throw error;
        if(results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados');
        }
    })

})

app.get('/coordinadores', (req,res)=>{

    const sql = "SELECT * FROM usuarios where roles_id = 1";

    connection.query(sql,(error,results)=>{
        console.log(results);
        if(error) throw error;
        if(results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados');
        }
    })

})

app.get('/beneficiarios', (req,res)=>{

    const sql = "SELECT * FROM usuarios where roles_id = 3";

    connection.query(sql,(error,results)=>{
        console.log(results);
        if(error) throw error;
        if(results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados');
        }
    })

})


app.get('/vehiculos', (req,res)=>{

    const sql = "SELECT * FROM vehiculos";

    connection.query(sql,(error,results)=>{
        console.log(results);
        if(error) throw error;
        if(results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados');
        }
    })

})


app.post('/agregarVoluntario', (req,res)=>{
    console.log(req.body);
    const sql = "INSERT INTO usuarios (nombre, email, nivel, roles_id, entidades_id) VALUES('"
    +req.body.nombre+"', '"+req.body.email+"',1,2,2);";

    connection.query(sql,(error)=>{
        if(error) throw error;
     
    })
})

app.put('/eliminarUsuario', (req,res)=>{
    const sql = "DELETE FROM usuarios WHERE id="+req.body.id+";"
    connection.query(sql,(error)=>{
        if(error) throw error;
     
    })
});