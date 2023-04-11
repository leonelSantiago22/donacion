"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.administradorRoutes = void 0;
const express_1 = require("express");
const administradorController_1 = require("../controllers/administradorController");
const auth_1 = require("../middleware/auth");
class AdministradorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/verificar', auth_1.validarToken, administradorController_1.administradorController.verificar);
        this.router.get('/:numero_trabajador', auth_1.validarToken, administradorController_1.administradorController.listOne);
        this.router.get('/', auth_1.validarToken, administradorController_1.administradorController.list);
    }
}
exports.administradorRoutes = new AdministradorRoutes();
exports.default = exports.administradorRoutes.router;
