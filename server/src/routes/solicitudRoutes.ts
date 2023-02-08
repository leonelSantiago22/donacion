import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { solicitudController } from '../controllers/solicitudController';

class SolicitudRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', solicitudController.list);
        this.router.delete('/delete/:idsolicitud', solicitudController.delete);
        this.router.post('/', solicitudController.create);
        this.router.put('/update/:idsolicitud', solicitudController.update);
        this.router.get('/:idsolicitud', solicitudController.listOne);
        this.router.get('/listar/:idbanco/:idsolicitud', solicitudController.listarconBanco);

    }
}

export  const solicitudRoutes = new SolicitudRoutes();
export default solicitudRoutes.router;
