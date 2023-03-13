import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import {hospitalController} from '../controllers/hospitalController';
import { validarToken } from '../middleware/auth';

class HospitalRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/',validarToken, hospitalController.list);
        this.router.delete('/delete/:idhospital',validarToken, hospitalController.delete);
        this.router.post('/',validarToken, hospitalController.create);
        this.router.put('/update/:idhospital',validarToken, hospitalController.update);
        this.router.get('/list/:idhospital',validarToken, hospitalController.listOne);
    }
}

export  const hospitalRoutes = new HospitalRoutes();
export default hospitalRoutes.router;
