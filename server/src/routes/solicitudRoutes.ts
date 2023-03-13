import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { solicitudController } from '../controllers/solicitudController';
import { validarToken } from '../middleware/auth';

class SolicitudRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, solicitudController.list);
        this.router.delete('/delete/:idsolicitud',validarToken, solicitudController.delete);
        this.router.post('/',validarToken, solicitudController.create);
        this.router.put('/update/:idsolicitud',validarToken, solicitudController.update);
        this.router.get('/:idsolicitud',validarToken, solicitudController.listOne);
        this.router.get('/listar/:idbanco/:idsolicitud',validarToken, solicitudController.listarconBanco);

    }
}

export  const solicitudRoutes = new SolicitudRoutes();
export default solicitudRoutes.router;
