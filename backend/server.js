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