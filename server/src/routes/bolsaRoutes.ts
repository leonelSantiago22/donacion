import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { bolsaController } from '../controllers/bolsaController';
import { validarToken } from '../middleware/auth';

class BolsaRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, bolsaController.list);
        this.router.delete('/delete/:idbolsa',validarToken, bolsaController.delete);
        this.router.post('/',validarToken, bolsaController.create);
        this.router.put('/update/:idbolsa',validarToken, bolsaController.update);
        this.router.get('/:id1',validarToken, bolsaController.listOne);
    }
}

export  const bolsaRoutes = new BolsaRoutes();
export default bolsaRoutes.router;