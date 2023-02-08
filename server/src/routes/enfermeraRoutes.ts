import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { enfermeraController } from '../controllers/enfermeraController';
class EnfermeraRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.post('/verificar', enfermeraController.verificar);
        this.router.get('/', enfermeraController.list);
        this.router.delete('/delete/:numero_trabajador', enfermeraController.delete);
        this.router.post('/', enfermeraController.create);
        this.router.put('/update/:numero_trabajador', enfermeraController.update);
        this.router.get('/list/:numero_trabajador', enfermeraController.listOne);
    }
}

export  const enfermeraRoutes = new EnfermeraRoutes();
export default enfermeraRoutes.router;
