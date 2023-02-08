import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class PersonaController
{
    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM persona';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listMax(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM persona WHERE idpersona = (SELECT max(idpersona) FROM persona)';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async create(req: Request, res: Response ): Promise<void>
    {
        console.log(req);
        const resp = await pool.query("INSERT INTO persona set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);
    }
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const { idpersona} = req.params;
        const resp = await pool.query(`DELETE FROM persona WHERE idpersona= ${idpersona}`);
        res.json(resp);
    }
    public async update(req: Request, res: Response ): Promise<void>
    {
        const { idpersona } = req.params;
        console.log(req.body);
        const resp = await pool.query("UPDATE persona set ? WHERE idpersona = ?", [req.body, idpersona]);
        res.json(resp);
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {idpersona} = req.params;
        const consulta = 'SELECT * FROM persona WHERE idpersona = '+ idpersona;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Donador no encontrado'});
    }

}

export const  personaController = new PersonaController();
