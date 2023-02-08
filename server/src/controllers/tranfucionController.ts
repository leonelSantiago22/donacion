import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class TransfucionController
{
    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM transfucion';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async create(req: Request, res: Response ): Promise<void>
    {
        console.log(req);
        const resp = await pool.query("INSERT INTO transfucion set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);
    }
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const { idsolicitud, idpaciente} = req.params;
        const resp = await pool.query(`DELETE FROM transfucion WHERE idsolicitud= ${idsolicitud} and idpaciente =${idpaciente}`);
        res.json(resp);
    }
    public async update(req: Request, res: Response ): Promise<void>
    {
        const { id, id2} = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE transfucion set ? WHERE idsolicitud = ? and idpaciente = ?", [req.body, id,id2]);
        res.json(resp);
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {idsolicitud,idpaciente} = req.params;
        const consulta = 'SELECT * FROM transfucion WHERE idsolicitud = '+ idsolicitud+'and idpaciente='+idpaciente;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Solicitud no encontrada'});
    }
}

export const  transfucionController = new TransfucionController();
