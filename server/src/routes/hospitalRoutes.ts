import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import {hospitalController} from '../controllers/hospitalController';
class HospitalRoutes
{
    public router:  Router = Router();
    constructor()
    {
        this.config();
    }
    config(): void{
        this.router.get('/', hospitalController.list);
        this.router.delete('/delete/:idhospital', hospitalController.delete);
        this.router.post('/', hospitalController.create);
        this.router.put('/update/:idhospital', hospitalController.update);
        this.router.get('/list/:idhospital', hospitalController.listOne);
    }
}

export  const hospitalRoutes = new HospitalRoutes();
export default hospitalRoutes.router;
