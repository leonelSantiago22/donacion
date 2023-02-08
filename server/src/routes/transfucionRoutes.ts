import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';

import { transfucionController } from '../controllers/tranfucionController';
class TransfucionRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', transfucionController.list);
        this.router.delete('/delete/:idsolicitud/:idpaciente', transfucionController.delete);
        this.router.post('/', transfucionController.create);
        this.router.put('/update/:id/:id2', transfucionController.update);
        this.router.get('/:idtransfucion/:idpaciente', transfucionController.listOne);
    }
}

export  const transfucionRoutes = new TransfucionRoutes();
export default transfucionRoutes.router;
