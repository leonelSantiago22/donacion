import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { personaController } from '../controllers/personaController';

class PersonaRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', personaController.list);
        this.router.get('/max', personaController.listMax);
        this.router.delete('/delete/:idpersona', personaController.delete);
        this.router.post('/', personaController.create);
        this.router.put('/update/:idpersona', personaController.update);
        this.router.get('/list/:idpersona', personaController.listOne);
    }
}

export  const personaRoutes = new PersonaRoutes();
export default personaRoutes.router;
