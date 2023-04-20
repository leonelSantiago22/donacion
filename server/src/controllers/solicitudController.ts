import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class SolicitudController
{
    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM solicitud';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listarconBanco(req:Request,res:Response): Promise<void>
    {
        const { idbanco,idsolicitud } = req.params;
        const consulta = `SELECT * FROM banco, solicitud WHERE banco.idbanco = solicitud.idbanco =${idbanco} and solicitud.idsolicitud = ${idsolicitud}`;
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
            res.status(404).json({'mensaje': 'Cliente no encontrado'});
        console.log(respuesta);
    }

    public async create(req: Request, res: Response ): Promise<void>
    {
        console.log(req);
        const resp = await pool.query("INSERT INTO solicitud set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);
    }
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const { idsolicitud } = req.params;
        const resp = await pool.query(`DELETE FROM solicitud WHERE idsolicitud= ${idsolicitud}`);
        res.json(resp);
    }
    public async update(req: Request, res: Response ): Promise<void>
    {
        const { idsolicitud } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE solicitud set ? WHERE idsolicitud = ?", [req.body, idsolicitud]);
        res.json(resp);
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {idsolicitud} = req.params;
        const consulta = 'SELECT * FROM solicitud WHERE idsolicitud = '+ idsolicitud;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Solicitud no encontrada'});
    }

}

export const  solicitudController = new SolicitudController();
