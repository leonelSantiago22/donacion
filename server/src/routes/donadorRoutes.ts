import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { donadorController } from '../controllers/donadorController';
class DonadorRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void
    {
        this.router.get('/', donadorController.list);
        this.router.delete('/delete/:iddonador', donadorController.delete);
        this.router.post('/', donadorController.create);
        this.router.put('/update/:iddonador', donadorController.update);
        this.router.get('/:iddonador', donadorController.listOne);
        this.router.get('/:iddonador/:idpersona', donadorController.listOneCartesiano);
    }
}

export  const donadorRoutes = new DonadorRoutes();
export default donadorRoutes.router;
