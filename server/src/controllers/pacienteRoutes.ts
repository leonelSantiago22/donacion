import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class PacienteController
{
    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM paciente';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {idpaciente} = req.params;
        const consulta = 'SELECT * FROM paciente WHERE idpaciente = '+ idpaciente;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Paciente no encontrado'});
    }
    public async listOneCartesiano(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {idpaciente,idpersona} = req.params;
        const consulta = `SELECT * FROM paciente,persona WHERE paciente.idpersona =${idpersona} and persona.idpersona=${idpersona} and paciente.idpaciente=${idpaciente}`;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Cliente no encontrado'});
    }
    public async listOnepaciente(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {idpaciente} = req.params;
        const consulta2 = 'SELECT * FROM paciente WHERE idpaciente = '+ idpaciente;
          const respuesta2 = await pool.query(consulta2);
        console.log(respuesta2[0].idpersona);
        let idpersona = respuesta2[0].idpersona;
        const consulta = `SELECT * FROM paciente,persona WHERE paciente.idpersona =${idpersona} and persona.idpersona=${idpersona} and paciente.idpaciente=${idpaciente}`;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Cliente no encontrado'});
    }
    public async create(req: Request, res: Response ): Promise<void>
    {
        console.log(req);
        const resp = await pool.query("INSERT INTO paciente set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);
    }

    //INSERT INTO persona (idpersona, nombre, edad, genero) VALUES (NULL, 'Pedro picos piedra', '134', 'M');
    //INSERT INTO paciente(idpaciente, idpersona, tipodesangre) VALUES(NULL, SELECT max(idpersona) FROM persona, 'AR+H')
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const {idpaciente} = req.params;
        const resp = await pool.query(`DELETE FROM paciente WHERE idpaciente= ${idpaciente}`);
        res.json(resp);
    }
    public async update(req: Request, res: Response ): Promise<void>
    {
        const { idpaciente } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE paciente set ? WHERE idpaciente = ?", [req.body, idpaciente]);
        res.json(resp);
    }
}

export const  pacienteController = new PacienteController();
