import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { bancoController } from '../controllers/bancoController';
class BancoRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', bancoController.list);
        this.router.delete('/delete/:idsolicitud', bancoController.delete);
        this.router.post('/', bancoController.create);
        this.router.put('/update/:idsolicitud', bancoController.update);
        this.router.get('/:idbanco', bancoController.listOne);
        this.router.get('/inventario/:idbanco', bancoController.listBancodonaciones);
    }
}

export  const bancoRoutes = new BancoRoutes();
export default bancoRoutes.router;
