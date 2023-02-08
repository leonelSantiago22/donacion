import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { inventarioController } from '../controllers/inventarioController';

class InventarioRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', inventarioController.list);
        this.router.delete('/delete/:idbanco/:idbolsa', inventarioController.delete);
        this.router.post('/', inventarioController.create);
        this.router.put('/update/:id/:id2', inventarioController.update);
    }
}

export  const inventarioRoutes = new InventarioRoutes();
export default inventarioRoutes.router;