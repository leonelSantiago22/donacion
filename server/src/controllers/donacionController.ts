import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class DonacionController 
{   
    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM donacion';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async create(req: Request, res: Response ): Promise<void>
    {
        console.log(req);
        const resp = await pool.query("INSERT INTO donacion set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);   
    }
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const { idbolsa } = req.params;
        const resp = await pool.query(`DELETE FROM donacion WHERE iddonacion= ${idbolsa}`);
        res.json(resp);
    }
    public async update(req: Request, res: Response ): Promise<void>
    {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE donacion set ? WHERE iddonacion = ?", [req.body, id]);
        res.json(resp);
    }
}

export const  donacionController = new DonacionController();
