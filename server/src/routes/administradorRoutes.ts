import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { administradorController } from '../controllers/administradorController';
class AdministradorRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.post('/verificar', administradorController.verificar);
        this.router.get('/:numero_trabajador', administradorController.listOne);
        this.router.get('/', administradorController.list);
    }
}

export  const administradorRoutes = new AdministradorRoutes();
export default administradorRoutes.router;
