"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pacienteRoutes = void 0;
const express_1 = require("express");
const pacienteRoutes_1 = require("../controllers/pacienteRoutes");
class PacienteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pacienteRoutes_1.pacienteController.list);
        this.router.delete('/delete/:idpaciente', pacienteRoutes_1.pacienteController.delete);
        this.router.post('/', pacienteRoutes_1.pacienteController.create);
        this.router.put('/update/:idpaciente', pacienteRoutes_1.pacienteController.update);
        this.router.get('/:idpaciente', pacienteRoutes_1.pacienteController.listOne);
        this.router.get('/list/:idpaciente', pacienteRoutes_1.pacienteController.listOnepaciente);
        this.router.get('/:idpaciente/:idpersona', pacienteRoutes_1.pacienteController.listOneCartesiano);
    }
}
exports.pacienteRoutes = new PacienteRoutes();
exports.default = exports.pacienteRoutes.router;
