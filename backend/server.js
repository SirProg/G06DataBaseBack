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


app.get('/api/calzados', (req, res) => {
    const sql = 'SELECT * FROM Calzado';
    connection.query(sql, (error, results) => {
        if (error) {
            res.send('Error al obtener los calzados');
        } else {
            res.json(results);
        }
    });
});

app.post("/api/addCalzado", (req, res) => {
    const {id, talla, color, precio, tipo, nombre, existencias} = req.body;
    connection.query(
        "INSERT INTO Calzado (IDCalzado, Talla, Color, Precio, Tipo, Nombre, ExistenciasActuales) values(?, ?, ?, ?, ?, ?, ?)",
        [id, talla, color, precio, tipo, nombre, existencias],
        (err, result) => {
            if(err){
                res.status(500).json({error: "Error para crear los calzados"});
                return;
            }
            res.status(200).json({message: "Calzado creado exitosamente"});
        });
});

app.put('/api/updateCalzado/:id', (req, res) => {
    const {id} = req.params;
    const {talla, color, precio, tipo, nombre, existencias} = req.body;
    connection.query(
        'UPDATE Calzado SET Talla = ?, Color = ?, Precio = ?, Tipo = ?, Nombre = ?, ExistenciasActuales = ? WHERE IDCalzado = ?',
        [talla, color, precio, tipo, nombre, existencias, id],
        (err)=>{
            if(err){
                res.status(500).json({error: "Error para actualizar el calzado"});
            }
            res.json({id, talla, color, precio, tipo, nombre, existencias});
        });
});

app.delete('/api/deleteCalzado/:id',(req, res) =>{
    const {id} = req.params;
    connection.query(
        'DELETE FROM Calzado WHERE IDCalzado = ?',
        [id],
        (err)=>{
            if(err){
                res.status(500).json({error: "Error para eliminar el calzado"});
            }
            res.json({message: "Calzado eliminado exitosamente"});
        });
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