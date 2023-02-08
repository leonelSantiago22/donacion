import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class EnfermeraController
{
    public async verificar(req:Request, res:Response): Promise<void>
    {
        console.log(req.body)
        const consulta = `SELECT numero_trabajador FROM enfermera WHERE numero_trabajador="${req.body.numero_trabajador }" and password="${req.body.password}"`;
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        if (respuesta.length == 0) {
            console.log("null");
            res.json(null );
            return ;
        }else{

          res.json( respuesta[0] );
          return;
        }
    }
    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM enfermera';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {numero_trabajador} = req.params;
        const consulta = 'SELECT * FROM enfermera WHERE numero_trabajador = '+ numero_trabajador;
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
        const resp = await pool.query("INSERT INTO enfermera set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);
    }
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const { numero_trabajador } = req.params;
        const resp = await pool.query(`DELETE FROM enfermera WHERE numero_trabajador= ${numero_trabajador}`);
        res.json(resp);
    }
    public async update(req: Request, res: Response ): Promise<void>
    {
        const { numero_trabajador } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE enfermera set ? WHERE numero_trabajador = ?", [req.body, numero_trabajador]);
        res.json(resp);
    }
}

export const  enfermeraController = new EnfermeraController();
