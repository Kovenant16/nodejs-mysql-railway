import { pool } from "../db.js";

export const getProductos = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM producto"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLocales = async (req, res) => {
    try {
        const [result] = await pool.query(
            "select * from  tienda t,tipolocal tl where t.idTipoLocal = tl.idTipoLocal"
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query("select * from producto P left join tienda T on P.idTienda = T.idTienda where T.nombreTienda = ?", [
            req.params.nombreTienda,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Task not found" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT p.idTipoProducto, tp.nombreTipoProducto FROM producto p, tipoproducto tp, tienda t WHERE t.nombreTienda = ? AND  tp.idTipoProducto = p.idTipoProducto AND p.idTienda = t.idTienda group by idTipoProducto", [
            req.params.nombreTienda,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Task not found" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tasks(title, description) VALUES (?, ?)",
            [title, description]
        );
        res.json({
            id: result.insertId,
            title,
            description,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const crearTipoProducto = async (req, res) => {
    try {
        const { nombreTipoProducto, descripcionTipoProducto, urlImagenTipoProducto} = req.body;
        const [result] = await pool.query(
            "INSERT INTO tipoproducto(nombreTipoProducto, descripcionTipoProducto, urlImagenTipoProducto) VALUES (?, ?,?,?)",
            [nombreTipoProducto, descripcionTipoProducto, urlImagenTipoProducto]
        );
        res.json({
            id: result.insertId,
            nombreTipoProducto,
            descripcionTipoProducto,
            urlImagenTipoProducto
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
