import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { donadorController } from '../controllers/donadorController';
import { validarToken } from '../middleware/auth';
validarToken
class DonadorRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void
    {
        this.router.get('/',validarToken, donadorController.list);
        this.router.delete('/delete/:iddonador',validarToken, donadorController.delete);
        this.router.post('/',validarToken, donadorController.create);
        this.router.post('/create/',validarToken, donadorController.createDP);
        this.router.put('/update/:iddonador',validarToken, donadorController.update);
        this.router.put('/update/:iddonador/:idpersona',validarToken, donadorController.actualizarDP);
        this.router.get('/:iddonador',validarToken, donadorController.listOne);
        this.router.get('/:iddonador/:idpersona',validarToken, donadorController.listOneCartesiano);
    }
}

export  const donadorRoutes = new DonadorRoutes();
export default donadorRoutes.router;
