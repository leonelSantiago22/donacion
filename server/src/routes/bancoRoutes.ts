import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { bancoController } from '../controllers/bancoController';
import { validarToken } from '../middleware/auth';

class BancoRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, bancoController.list);
        this.router.delete('/delete/:idbanco',validarToken, bancoController.delete);
        this.router.post('/',validarToken, bancoController.create);
        this.router.put('/update/:idbanco',validarToken, bancoController.update);
        this.router.get('/:idbanco',validarToken, bancoController.listOne);
        this.router.get('/inventario/:idbanco',validarToken, bancoController.listBancodonaciones);
    }
}

export  const bancoRoutes = new BancoRoutes();
export default bancoRoutes.router;
