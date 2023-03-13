import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { donacionController } from '../controllers/donacionController';
import { validarToken } from '../middleware/auth';

class DonacionRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, donacionController.list);
        this.router.delete('/delete/:idbolsa',validarToken, donacionController.delete);
        this.router.post('/',validarToken, donacionController.create);
        this.router.put('/update/:idbolsa',validarToken, donacionController.update);
      
    }
}

export  const donacionRoutes = new DonacionRoutes();
export default donacionRoutes.router;