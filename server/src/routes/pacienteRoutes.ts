import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { pacienteController } from '../controllers/pacienteRoutes';
import { validarToken } from '../middleware/auth';

class PacienteRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, pacienteController.list);
        this.router.delete('/delete/:idpaciente',validarToken, pacienteController.delete);
        this.router.post('/',validarToken, pacienteController.create);
        this.router.post('/create/',validarToken, pacienteController.createPP);
        this.router.put('/update/:idpaciente',validarToken, pacienteController.update);
        this.router.put('/actualizar/:idpaciente/:idpersona',validarToken, pacienteController.actualizarPP);
        this.router.get('/:idpaciente',validarToken, pacienteController.listOne);
        this.router.get('/list/:idpaciente',validarToken, pacienteController.listOnepaciente);
        this.router.get('/:idpaciente/:idpersona',validarToken, pacienteController.listOneCartesiano);
    }
}

export  const pacienteRoutes = new PacienteRoutes();
export default pacienteRoutes.router;
