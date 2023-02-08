import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

class UsuarioRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config() : void {
        this.router.get('/', usuarioController.list);
    }
}

export const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;