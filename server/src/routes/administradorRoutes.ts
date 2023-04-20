import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';

import { administradorController } from '../controllers/administradorController';
import { validarToken } from '../middleware/auth';
class AdministradorRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.post('/verificar',validarToken, administradorController.verificar);
        this.router.get('/:numero_trabajador',validarToken, administradorController.listOne);
        this.router.get('/',validarToken, administradorController.list);
    }
}

export  const administradorRoutes = new AdministradorRoutes();
export default administradorRoutes.router;
