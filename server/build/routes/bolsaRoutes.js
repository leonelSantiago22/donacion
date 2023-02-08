"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bolsaRoutes = void 0;
const express_1 = require("express");
const bolsaController_1 = require("../controllers/bolsaController");
class BolsaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', bolsaController_1.bolsaController.list);
        this.router.delete('/delete/:idbolsa', bolsaController_1.bolsaController.delete);
        this.router.post('/', bolsaController_1.bolsaController.create);
        this.router.put('/update/:idbolsa', bolsaController_1.bolsaController.update);
        this.router.get('/:id1', bolsaController_1.bolsaController.listOne);
    }
}
exports.bolsaRoutes = new BolsaRoutes();
exports.default = exports.bolsaRoutes.router;
