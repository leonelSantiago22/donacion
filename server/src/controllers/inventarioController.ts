import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class InventarioController 
{   
    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM inventario';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async create(req: Request, res: Response ): Promise<void>
    {
        console.log(req);
        const resp = await pool.query("INSERT INTO inventario set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);   
    }
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const { idbanco, idbolsa } = req.params;
        const resp = await pool.query(`DELETE FROM inventario WHERE idbolsa= ${idbolsa} and idbanco =${idbanco}`);
        res.json(resp);
    }
    public async update(req: Request, res: Response ): Promise<void>
    {
        const { id,id2 } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE inventario set ? WHERE idbanco = ? and idbolsa = ?", [req.body, id,id2]);
        res.json(resp);
    }
}

export const  inventarioController = new InventarioController();
