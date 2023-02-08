"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.administradorRoutes = void 0;
const express_1 = require("express");
const administradorController_1 = require("../controllers/administradorController");
class AdministradorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/verificar', administradorController_1.administradorController.verificar);
        this.router.get('/:numero_trabajador', administradorController_1.administradorController.listOne);
        this.router.get('/', administradorController_1.administradorController.list);
    }
}
exports.administradorRoutes = new AdministradorRoutes();
exports.default = exports.administradorRoutes.router;
