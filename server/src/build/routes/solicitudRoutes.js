"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitudRoutes = void 0;
const express_1 = require("express");
const solicitudController_1 = require("../controllers/solicitudController");
const auth_1 = require("../middleware/auth");
class SolicitudRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, solicitudController_1.solicitudController.list);
        this.router.delete('/delete/:idsolicitud', auth_1.validarToken, solicitudController_1.solicitudController.delete);
        this.router.post('/', auth_1.validarToken, solicitudController_1.solicitudController.create);
        this.router.put('/update/:idsolicitud', auth_1.validarToken, solicitudController_1.solicitudController.update);
        this.router.get('/:idsolicitud', auth_1.validarToken, solicitudController_1.solicitudController.listOne);
        this.router.get('/listar/:idbanco/:idsolicitud', auth_1.validarToken, solicitudController_1.solicitudController.listarconBanco);
    }
}
exports.solicitudRoutes = new SolicitudRoutes();
exports.default = exports.solicitudRoutes.router;
