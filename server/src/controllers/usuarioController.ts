import { Request, Response } from "express";
import pool from "../database";

class UsuarioController {
    public async list(req: Request, res: Response) {
        console.log(req.params);
        const consulta = 'SELECT * FROM usuarios';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
}

export const usuarioController = new UsuarioController();