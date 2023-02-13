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
        this.router.post('/create/', enfermeraController.createDP);
        this.router.put('/updates/:numero_trabajador/:idpersona', enfermeraController.actualizarDP);
        this.router.put('/update/:numero_trabajador', enfermeraController.update);
        this.router.get('/list/:numero_trabajador', enfermeraController.listOne);
        this.router.get('/list/:numero_trabajador/:idpersona', enfermeraController.listOneCatersioano);
    }
}

export  const enfermeraRoutes = new EnfermeraRoutes();
export default enfermeraRoutes.router;
