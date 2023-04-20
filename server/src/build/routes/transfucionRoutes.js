"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfucionRoutes = void 0;
const express_1 = require("express");
const tranfucionController_1 = require("../controllers/tranfucionController");
const auth_1 = require("../middleware/auth");
class TransfucionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, tranfucionController_1.transfucionController.list);
        this.router.delete('/delete/:idsolicitud/:idpaciente', auth_1.validarToken, tranfucionController_1.transfucionController.delete);
        this.router.post('/', auth_1.validarToken, tranfucionController_1.transfucionController.create);
        this.router.put('/update/:id/:id2', auth_1.validarToken, tranfucionController_1.transfucionController.update);
        this.router.get('/:idtransfucion/:idpaciente', auth_1.validarToken, tranfucionController_1.transfucionController.listOne);
    }
}
exports.transfucionRoutes = new TransfucionRoutes();
exports.default = exports.transfucionRoutes.router;
