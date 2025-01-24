const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'autorack.proxy.rlwy.net',
    user: 'root',
    password: 'lnhgcSobelSmKNAUnCfndnepWFMvbMLD',
    database: 'G06',
});


const dataCalzados = app.get('/api/calzados', (req, res) => {
    const sql = 'SELECT * FROM Calzados';
    connection.query(sql, (error, results) => {
        if (error) {
            res.send('Error al obtener los calzados');
        } else {
            res.json(results);
        }
    });
});

console.log(dataCalzados)

connection.connect((err) =>{
    if(err){
        console.log("Error para conectarse a la base de datos:", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos");
});


const PORT = process.env.PORT || 11978;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});