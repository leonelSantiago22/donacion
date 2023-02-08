import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { donacionController } from '../controllers/donacionController';

class DonacionRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', donacionController.list);
        this.router.delete('/delete/:idbolsa', donacionController.delete);
        this.router.post('/', donacionController.create);
        this.router.put('/update/:idbolsa', donacionController.update);
      
    }
}

export  const donacionRoutes = new DonacionRoutes();
export default donacionRoutes.router;