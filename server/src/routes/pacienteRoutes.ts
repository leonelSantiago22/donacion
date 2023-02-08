import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { pacienteController } from '../controllers/pacienteRoutes';

class PacienteRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', pacienteController.list);
        this.router.delete('/delete/:idpaciente', pacienteController.delete);
        this.router.post('/', pacienteController.create);
        this.router.put('/update/:idpaciente', pacienteController.update);
        this.router.get('/:idpaciente', pacienteController.listOne);
        this.router.get('/list/:idpaciente', pacienteController.listOnepaciente);
        this.router.get('/:idpaciente/:idpersona', pacienteController.listOneCartesiano);
    }
}

export  const pacienteRoutes = new PacienteRoutes();
export default pacienteRoutes.router;
