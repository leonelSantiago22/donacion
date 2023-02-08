"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donadorRoutes = void 0;
const express_1 = require("express");
const donadorController_1 = require("../controllers/donadorController");
class DonadorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', donadorController_1.donadorController.list);
        this.router.delete('/delete/:iddonador', donadorController_1.donadorController.delete);
        this.router.post('/', donadorController_1.donadorController.create);
        this.router.put('/update/:iddonador', donadorController_1.donadorController.update);
        this.router.get('/:iddonador', donadorController_1.donadorController.listOne);
        this.router.get('/:iddonador/:idpersona', donadorController_1.donadorController.listOneCartesiano);
    }
}
exports.donadorRoutes = new DonadorRoutes();
exports.default = exports.donadorRoutes.router;
