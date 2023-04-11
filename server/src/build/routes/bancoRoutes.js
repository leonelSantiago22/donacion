"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bancoRoutes = void 0;
const express_1 = require("express");
const bancoController_1 = require("../controllers/bancoController");
const auth_1 = require("../middleware/auth");
class BancoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, bancoController_1.bancoController.list);
        this.router.delete('/delete/:idbanco', auth_1.validarToken, bancoController_1.bancoController.delete);
        this.router.post('/', auth_1.validarToken, bancoController_1.bancoController.create);
        this.router.put('/update/:idbanco', auth_1.validarToken, bancoController_1.bancoController.update);
        this.router.get('/:idbanco', auth_1.validarToken, bancoController_1.bancoController.listOne);
        this.router.get('/inventario/:idbanco', auth_1.validarToken, bancoController_1.bancoController.listBancodonaciones);
    }
}
exports.bancoRoutes = new BancoRoutes();
exports.default = exports.bancoRoutes.router;
