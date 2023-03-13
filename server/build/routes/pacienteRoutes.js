"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pacienteRoutes = void 0;
const express_1 = require("express");
const pacienteRoutes_1 = require("../controllers/pacienteRoutes");
const auth_1 = require("../middleware/auth");
class PacienteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, pacienteRoutes_1.pacienteController.list);
        this.router.delete('/delete/:idpaciente', auth_1.validarToken, pacienteRoutes_1.pacienteController.delete);
        this.router.post('/', auth_1.validarToken, pacienteRoutes_1.pacienteController.create);
        this.router.post('/create/', auth_1.validarToken, pacienteRoutes_1.pacienteController.createPP);
        this.router.put('/update/:idpaciente', auth_1.validarToken, pacienteRoutes_1.pacienteController.update);
        this.router.put('/actualizar/:idpaciente/:idpersona', auth_1.validarToken, pacienteRoutes_1.pacienteController.actualizarPP);
        this.router.get('/:idpaciente', auth_1.validarToken, pacienteRoutes_1.pacienteController.listOne);
        this.router.get('/list/:idpaciente', auth_1.validarToken, pacienteRoutes_1.pacienteController.listOnepaciente);
        this.router.get('/:idpaciente/:idpersona', auth_1.validarToken, pacienteRoutes_1.pacienteController.listOneCartesiano);
    }
}
exports.pacienteRoutes = new PacienteRoutes();
exports.default = exports.pacienteRoutes.router;
