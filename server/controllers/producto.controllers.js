import { connect } from "../db.js";

export const getProductos = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM producto')
    res.json(rows)
}

export const getProducto = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM producto WHERE idProducto = ?', [req.params.idProducto])
    res.json(rows[0])
}

export const getProductoCount = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT COUNT(*) FROM producto')
    res.json(rows[0]["COUNT(*)"])
}
 
export const saveProducto = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO tasks(title, description) VALUES (?, ?)", [
        
    ])
    res.json({
        id: results.insertId,
        ...req.body
    })
}

export const deleteTask = async (req, res) => {
    const connection = await connect()
    await connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id])
    res.sendStatus(204)
}

export const updateTask = async (req, res) => {
    const connection = await connect()
    await connection.query('UPDATE tasks SET ? WHERE id = ?', [
        req.body,
        req.params.id
    ])
    res.sendStatus(204)
}