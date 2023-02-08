import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class HospitalController
{

    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM hospital';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {idhospital} = req.params;
        const consulta = 'SELECT * FROM hospital WHERE idhospital = '+ idhospital;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Trabajador no encontrado'});
    }
    public async create(req: Request, res: Response ): Promise<void>
    {
        console.log(req);
        const resp = await pool.query("INSERT INTO hospital set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);
    }
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const { idhospital } = req.params;
        const resp = await pool.query(`DELETE FROM hospital WHERE idhospital= ${idhospital}`);
        res.json(resp);
    }
    public async update(req: Request, res: Response ): Promise<void>
    {
        const { idhospital } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE enfermera set ? WHERE idhospital = ?", [req.body, idhospital]);
        res.json(resp);
    }
}

export const  hospitalController = new HospitalController();
