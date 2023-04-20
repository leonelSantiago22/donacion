import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { enfermeraController } from '../controllers/enfermeraController';
import { validarToken } from '../middleware/auth';
class EnfermeraRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.post('/verificar',validarToken, enfermeraController.verificar);
        this.router.get('/',validarToken, enfermeraController.list);
        this.router.get('/max/',validarToken, enfermeraController.obtenerMax);
        this.router.delete('/delete/:numero_trabajador',validarToken, enfermeraController.delete);
        this.router.post('/',validarToken, enfermeraController.create);
        this.router.post('/create/',validarToken, enfermeraController.createDP);
        this.router.put('/updates/:numero_trabajador/:idpersona',validarToken, enfermeraController.actualizarDP);
        this.router.put('/update/:numero_trabajador',validarToken, enfermeraController.update);
        this.router.get('/list/:numero_trabajador',validarToken, enfermeraController.listOne);
        this.router.get('/list/:numero_trabajador/:idpersona',validarToken, enfermeraController.listOneCatersioano);
    }
}

export  const enfermeraRoutes = new EnfermeraRoutes();
export default enfermeraRoutes.router;
