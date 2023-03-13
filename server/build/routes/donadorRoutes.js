"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donadorRoutes = void 0;
const express_1 = require("express");
const donadorController_1 = require("../controllers/donadorController");
const auth_1 = require("../middleware/auth");
auth_1.validarToken;
class DonadorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, donadorController_1.donadorController.list);
        this.router.delete('/delete/:iddonador', auth_1.validarToken, donadorController_1.donadorController.delete);
        this.router.post('/', auth_1.validarToken, donadorController_1.donadorController.create);
        this.router.post('/create/', auth_1.validarToken, donadorController_1.donadorController.createDP);
        this.router.put('/update/:iddonador', auth_1.validarToken, donadorController_1.donadorController.update);
        this.router.put('/update/:iddonador/:idpersona', auth_1.validarToken, donadorController_1.donadorController.actualizarDP);
        this.router.get('/:iddonador', auth_1.validarToken, donadorController_1.donadorController.listOne);
        this.router.get('/:iddonador/:idpersona', auth_1.validarToken, donadorController_1.donadorController.listOneCartesiano);
    }
}
exports.donadorRoutes = new DonadorRoutes();
exports.default = exports.donadorRoutes.router;
