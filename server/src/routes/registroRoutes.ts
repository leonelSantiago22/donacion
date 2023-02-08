import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { registroController } from '../controllers/registroController';

class RegistroRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', registroController.list);
        this.router.delete('/delete/:idbolsa', registroController.delete);
        this.router.post('/', registroController.create);
        this.router.put('/update/:idbolsa', registroController.update);
    }
}

export  const registroRoutes = new RegistroRoutes();
export default registroRoutes.router;