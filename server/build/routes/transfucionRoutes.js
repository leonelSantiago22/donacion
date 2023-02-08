"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfucionRoutes = void 0;
const express_1 = require("express");
const tranfucionController_1 = require("../controllers/tranfucionController");
class TransfucionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tranfucionController_1.transfucionController.list);
        this.router.delete('/delete/:idsolicitud/:idpaciente', tranfucionController_1.transfucionController.delete);
        this.router.post('/', tranfucionController_1.transfucionController.create);
        this.router.put('/update/:id/:id2', tranfucionController_1.transfucionController.update);
        this.router.get('/:idtransfucion/:idpaciente', tranfucionController_1.transfucionController.listOne);
    }
}
exports.transfucionRoutes = new TransfucionRoutes();
exports.default = exports.transfucionRoutes.router;
