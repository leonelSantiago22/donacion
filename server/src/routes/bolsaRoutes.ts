import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { bolsaController } from '../controllers/bolsaController';

class BolsaRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', bolsaController.list);
        this.router.delete('/delete/:idbolsa', bolsaController.delete);
        this.router.post('/', bolsaController.create);
        this.router.put('/update/:idbolsa', bolsaController.update);
        this.router.get('/:id1', bolsaController.listOne);
    }
}

export  const bolsaRoutes = new BolsaRoutes();
export default bolsaRoutes.router;