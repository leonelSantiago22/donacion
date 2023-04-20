import { json } from 'body-parser';
import {Request,response,Response} from 'express';
import pool from '../database';

class AdministradorController
{
  public async verificar(req:Request, res:Response): Promise<void>
  {
      console.log(req.body)
      const consulta = `SELECT numero_trabajador FROM administrador WHERE numero_trabajador="${req.body.numero_trabajador }" and password="${req.body.password}"`;
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
  public async listOne(req: Request, res: Response): Promise <void>
  {
      console.log(req.params);
      const {numero_trabajador} = req.params;
      const consulta = 'SELECT numero_trabajador,nombre FROM administrador WHERE numero_trabajador = '+ numero_trabajador;
      console.log(consulta)
      const respuesta = await pool.query(consulta);
      if(respuesta.length>0){
      res.json(respuesta[0]);
      return ;
      }
      res.status(404).json({'mensaje': 'Donador no encontrado'});
  }
  public async list(req:Request,res:Response): Promise<void>
    {
        console.log(req.params);
        const consulta = 'SELECT * FROM administrador';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
}
export const  administradorController = new  AdministradorController();
