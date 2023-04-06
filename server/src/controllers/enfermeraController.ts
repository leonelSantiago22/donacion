import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';

class EnfermeraController
{
    public async verificar(req:Request, res:Response): Promise<void>
    {
        console.log(req.body)
        const consulta = `SELECT password FROM enfermera WHERE numero_trabajador="${req.body.numero_trabajador }"`;  
  // Si la contraseña no coincide, envía un mensaje de error
        const respuesta = await pool.query(consulta);
        if (respuesta.length == 0) {
            console.log("null");
            res.json(null );
            return ;
        }else{
            const passwordMatches = bcrypt.compareSync(req.body.password, respuesta[0].password);
            if (!passwordMatches) {
                console.log("null");
                res.json(null);
                
            }else{
            res.json( respuesta[0] );
            }
          return;
        }
    }

    public async obtenerMax(req:Request, res:Response): Promise<void>
    {
        console.log(req.body)
        const consulta = `SELECT MAX(numero_trabajador) as validar FROM enfermera`;  
        const respuesta = await pool.query(consulta);
        res.json( respuesta[0] );
        console.log(respuesta[0].validar);
        return respuesta[0].validar;
    }

    
    public async verificarCorreo(req:Request, res:Response): Promise<void>
    {
        console.log(req.body)
        const consulta = `SELECT numero_trabajador FROM enfermera WHERE numero_trabajador="${req.body.numero_trabajador }" and correo = "${req.body.correo}"`;  
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
    public async listOneCatersioano(req: Request, res: Response): Promise <void>
    {
        console.log(req.params);
        const {numero_trabajador,idpersona} = req.params;
        const consulta = `SELECT enfermera.numero_trabajador,enfermera.idhospital,enfermera.idpersona,persona.nombre,persona.edad,persona.genero,enfermera.password FROM enfermera,persona WHERE enfermera.numero_trabajador = ${numero_trabajador} and persona.idpersona = ${idpersona} and enfermera.idpersona = ${idpersona}`;
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
    public async createDP(req: Request, res: Response ): Promise<void>
    {
        console.log("Create Dp");
        console.log(req.params);
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log(req.body.password)
        let prueba = await bcrypt.compare("holota", req.body.password);
        console.log(prueba);
        
        const {nombre, edad, genero,idhospital,password, correo} = req.body;
        const setIdPersona = await pool.query("SET @idpersona = 0;");
        const insertPersona = await pool.query("INSERT INTO persona(nombre, edad, genero) VALUES(?, ?, ?);", [nombre, edad, genero]);
        const setId = await pool.query(" SET @idpersona = LAST_INSERT_ID();");
        const getIdPersona = await pool.query("SELECT idpersona as idp from persona where idpersona = (select MAX(idpersona) from persona);");
        const idpersona = getIdPersona[0].idp;
        const resp2 = await pool.query(`INSERT INTO enfermera (numero_trabajador,idhospital ,idpersona,password,correo)VALUES (NULL,${idhospital},${idpersona},"${password}","${correo}");`);
        res.json({setIdPersona,insertPersona,setId, getIdPersona,resp2});
    }
    public async actualizarDP(req: Request, res: Response ): Promise<void>
    {
            console.log(req.params);
            const {nombre, edad, genero,idhospital,password,correo} = req.body;
            const {numero_trabajador} = req.params;
            const updatePersona = await pool.query("UPDATE persona SET nombre=?, edad=?, genero=? WHERE idpersona=?", [nombre, edad, genero, req.params.idpersona]);
            const updateDonador = await pool.query(`UPDATE enfermera SET idhospital=${idhospital},password="${password}", correo ="${correo}" WHERE numero_trabajador=${numero_trabajador};`);
            console.log(updateDonador);
            res.json({updatePersona, updateDonador});
    }
    public async validarPassword(password:string, newPassword:string): Promise<boolean>
    {
        return await bcrypt.compare(password,newPassword);
    }
}

export const  enfermeraController = new EnfermeraController();
