"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enfermeraRoutes = void 0;
const express_1 = require("express");
const enfermeraController_1 = require("../controllers/enfermeraController");
class EnfermeraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/verificar', enfermeraController_1.enfermeraController.verificar);
        this.router.get('/', enfermeraController_1.enfermeraController.list);
        this.router.delete('/delete/:numero_trabajador', enfermeraController_1.enfermeraController.delete);
        this.router.post('/', enfermeraController_1.enfermeraController.create);
        this.router.put('/update/:numero_trabajador', enfermeraController_1.enfermeraController.update);
        this.router.get('/list/:numero_trabajador', enfermeraController_1.enfermeraController.listOne);
    }
}
exports.enfermeraRoutes = new EnfermeraRoutes();
exports.default = exports.enfermeraRoutes.router;
