import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { personaController } from '../controllers/personaController';
import { validarToken } from '../middleware/auth';

class PersonaRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, personaController.list);
        this.router.get('/max',validarToken, personaController.listMax);
        this.router.delete('/delete/:idpersona',validarToken, personaController.delete);
        this.router.post('/',validarToken, personaController.create);
        this.router.put('/update/:idpersona',validarToken, personaController.update);
        this.router.get('/list/:idpersona',validarToken, personaController.listOne);
    }
}

export  const personaRoutes = new PersonaRoutes();
export default personaRoutes.router;
