import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
});

//Obtener todos los calzados
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

//Insertar un nuevo calzado
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

//Actualizar un calzado existente
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

//Eliminar un calzado con su respectivo id
app.delete('/api/deleteCalzado/:id',(req, res) =>{
    const {id} = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID proporcionado no es válido" });
    }

    connection.query(
        'DELETE FROM Calzado WHERE IDCalzado = ?',
        [id],
        (err, result)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error al eliminar el calzado" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No se encontró el calzado con el ID proporcionado" });
            }

             res.json({ message: "Calzado eliminado exitosamente" });
        });
});

connection.connect((err) =>{
    if(err){
        console.log("Error para conectarse a la base de datos:", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos");
});


const PORT = process.env.PORT || process.env.MYSQLPORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});