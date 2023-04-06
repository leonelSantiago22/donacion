"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enfermeraRoutes = void 0;
const express_1 = require("express");
const enfermeraController_1 = require("../controllers/enfermeraController");
const auth_1 = require("../middleware/auth");
class EnfermeraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/verificar', auth_1.validarToken, enfermeraController_1.enfermeraController.verificar);
        this.router.get('/', auth_1.validarToken, enfermeraController_1.enfermeraController.list);
        this.router.get('/max/', auth_1.validarToken, enfermeraController_1.enfermeraController.obtenerMax);
        this.router.delete('/delete/:numero_trabajador', auth_1.validarToken, enfermeraController_1.enfermeraController.delete);
        this.router.post('/', auth_1.validarToken, enfermeraController_1.enfermeraController.create);
        this.router.post('/create/', auth_1.validarToken, enfermeraController_1.enfermeraController.createDP);
        this.router.put('/updates/:numero_trabajador/:idpersona', auth_1.validarToken, enfermeraController_1.enfermeraController.actualizarDP);
        this.router.put('/update/:numero_trabajador', auth_1.validarToken, enfermeraController_1.enfermeraController.update);
        this.router.get('/list/:numero_trabajador', auth_1.validarToken, enfermeraController_1.enfermeraController.listOne);
        this.router.get('/list/:numero_trabajador/:idpersona', auth_1.validarToken, enfermeraController_1.enfermeraController.listOneCatersioano);
    }
}
exports.enfermeraRoutes = new EnfermeraRoutes();
exports.default = exports.enfermeraRoutes.router;
