"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventarioRoutes = void 0;
const express_1 = require("express");
const inventarioController_1 = require("../controllers/inventarioController");
const auth_1 = require("../middleware/auth");
class InventarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, inventarioController_1.inventarioController.list);
        this.router.delete('/delete/:idbanco/:idbolsa', auth_1.validarToken, inventarioController_1.inventarioController.delete);
        this.router.post('/', auth_1.validarToken, inventarioController_1.inventarioController.create);
        this.router.put('/update/:id/:id2', auth_1.validarToken, inventarioController_1.inventarioController.update);
    }
}
exports.inventarioRoutes = new InventarioRoutes();
exports.default = exports.inventarioRoutes.router;
