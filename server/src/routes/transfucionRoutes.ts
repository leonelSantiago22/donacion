import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';

import { transfucionController } from '../controllers/tranfucionController';
import { validarToken } from '../middleware/auth';
class TransfucionRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, transfucionController.list);
        this.router.delete('/delete/:idsolicitud/:idpaciente',validarToken, transfucionController.delete);
        this.router.post('/',validarToken, transfucionController.create);
        this.router.put('/update/:id/:id2',validarToken, transfucionController.update);
        this.router.get('/:idtransfucion/:idpaciente',validarToken, transfucionController.listOne);
    }
}

export  const transfucionRoutes = new TransfucionRoutes();
export default transfucionRoutes.router;
