import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { inventarioController } from '../controllers/inventarioController';
import { validarToken } from '../middleware/auth';

class InventarioRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, inventarioController.list);
        this.router.delete('/delete/:idbanco/:idbolsa',validarToken, inventarioController.delete);
        this.router.post('/',validarToken, inventarioController.create);
        this.router.put('/update/:id/:id2',validarToken, inventarioController.update);
    }
}

export  const inventarioRoutes = new InventarioRoutes();
export default inventarioRoutes.router;