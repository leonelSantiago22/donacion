"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = void 0;
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const auth_1 = require("../middleware/auth");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, usuarioController_1.usuarioController.list);
    }
}
exports.usuarioRoutes = new UsuarioRoutes();
exports.default = exports.usuarioRoutes.router;
