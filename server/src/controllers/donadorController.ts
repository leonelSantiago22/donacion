import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class DonadorController
{
    public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM donador';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {iddonador} = req.params;
        const consulta = 'SELECT * FROM donador WHERE iddonador = '+ iddonador;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Donador no encontrado'});
    }
    public async listOneCartesiano(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {iddonador,idpersona} = req.params;
        const consulta = `SELECT persona.idpersona,donador.iddonador,donador.tipodesangre,persona.nombre,persona.edad,persona.genero FROM donador,persona WHERE donador.idpersona =${idpersona} and persona.idpersona=${idpersona} and donador.iddonador=${iddonador}`
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
      }
        res.status(404).json({'mensaje': 'Donador no encontrado'});
    }

    public async create(req: Request, res: Response ): Promise<void>
    {
        console.log(req);
        const resp = await pool.query("INSERT INTO donador set ?", [req.body]); //recibira los parametros por el body
        res.json(resp);
    }
    public async createDP(req: Request, res: Response ): Promise<void>
    {
        console.log("Create Dp");
        console.log(req.params);
        const {nombre, edad, genero, tipodesangre} = req.body;
        const setIdPersona = await pool.query("SET @idpersona = 0;");
        const insertPersona = await pool.query("INSERT INTO persona(nombre, edad, genero) VALUES(?, ?, ?);", [nombre, edad, genero]);
        const setId = await pool.query(" SET @idpersona = LAST_INSERT_ID();");
        const getIdPersona = await pool.query("SELECT idpersona as idp from persona where idpersona = (select MAX(idpersona) from persona);");
        const idpersona = getIdPersona[0].idp;
        const resp2 = await pool.query(`INSERT INTO donador (tipodesangre, idpersona)VALUES ("${tipodesangre}",${idpersona});`);
        res.json({setIdPersona,insertPersona,setId, getIdPersona,resp2});
    }
    public async actualizarDP(req: Request, res: Response ): Promise<void>
    {
    console.log(req.params);
    const {nombre, edad, genero, tipodesangre} = req.body;
    const {iddonador} = req.params;
    const updatePersona = await pool.query("UPDATE persona SET nombre=?, edad=?, genero=? WHERE idpersona=?", [nombre, edad, genero, req.params.idpersona]);
    const updateDonador = await pool.query(`UPDATE donador SET tipodesangre=? WHERE iddonador=${iddonador};`,[tipodesangre]);
    res.json({updatePersona, updateDonador});
    }
    public async delete(req: Request, res: Response ): Promise<void>
    {
        const { iddonador } = req.params;
        const resp = await pool.query(`DELETE FROM donador WHERE iddonador= ${iddonador}`);
        res.json(resp);
    }

    public async update(req: Request, res: Response ): Promise<void>
    {
        const { iddonador } = req.params;
        console.log("se actualizan los datos:",req.body);
        const resp = await pool.query("UPDATE donador set ? WHERE iddonador = ?", [req.body, iddonador]);
        res.json(resp);
        console.log(resp);
        
    }
}

export const  donadorController = new DonadorController();
