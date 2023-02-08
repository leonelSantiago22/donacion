"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitudRoutes = void 0;
const express_1 = require("express");
const solicitudController_1 = require("../controllers/solicitudController");
class SolicitudRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', solicitudController_1.solicitudController.list);
        this.router.delete('/delete/:idsolicitud', solicitudController_1.solicitudController.delete);
        this.router.post('/', solicitudController_1.solicitudController.create);
        this.router.put('/update/:idsolicitud', solicitudController_1.solicitudController.update);
        this.router.get('/:idsolicitud', solicitudController_1.solicitudController.listOne);
        this.router.get('/listar/:idbanco/:idsolicitud', solicitudController_1.solicitudController.listarconBanco);
    }
}
exports.solicitudRoutes = new SolicitudRoutes();
exports.default = exports.solicitudRoutes.router;
