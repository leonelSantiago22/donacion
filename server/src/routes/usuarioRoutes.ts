import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
import { validarToken } from "../middleware/auth";

class UsuarioRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config() : void {
        this.router.get('/',validarToken, usuarioController.list);
    }
}

export const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;