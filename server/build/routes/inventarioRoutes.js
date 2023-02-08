"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventarioRoutes = void 0;
const express_1 = require("express");
const inventarioController_1 = require("../controllers/inventarioController");
class InventarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', inventarioController_1.inventarioController.list);
        this.router.delete('/delete/:idbanco/:idbolsa', inventarioController_1.inventarioController.delete);
        this.router.post('/', inventarioController_1.inventarioController.create);
        this.router.put('/update/:id/:id2', inventarioController_1.inventarioController.update);
    }
}
exports.inventarioRoutes = new InventarioRoutes();
exports.default = exports.inventarioRoutes.router;
