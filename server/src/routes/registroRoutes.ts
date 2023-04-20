import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { registroController } from '../controllers/registroController';
import { validarToken } from '../middleware/auth';

class RegistroRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, registroController.list);
        this.router.delete('/delete/:idbolsa',validarToken, registroController.delete);
        this.router.post('/',validarToken, registroController.create);
        this.router.put('/update/:idbolsa',validarToken, registroController.update);
    }
}

export  const registroRoutes = new RegistroRoutes();
export default registroRoutes.router;