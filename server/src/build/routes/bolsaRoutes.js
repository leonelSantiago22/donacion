"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bolsaRoutes = void 0;
const express_1 = require("express");
const bolsaController_1 = require("../controllers/bolsaController");
const auth_1 = require("../middleware/auth");
class BolsaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, bolsaController_1.bolsaController.list);
        this.router.delete('/delete/:idbolsa', auth_1.validarToken, bolsaController_1.bolsaController.delete);
        this.router.post('/', auth_1.validarToken, bolsaController_1.bolsaController.create);
        this.router.put('/update/:idbolsa', auth_1.validarToken, bolsaController_1.bolsaController.update);
        this.router.get('/:id1', auth_1.validarToken, bolsaController_1.bolsaController.listOne);
    }
}
exports.bolsaRoutes = new BolsaRoutes();
exports.default = exports.bolsaRoutes.router;
