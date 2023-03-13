"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donacionRoutes = void 0;
const express_1 = require("express");
const donacionController_1 = require("../controllers/donacionController");
const auth_1 = require("../middleware/auth");
class DonacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, donacionController_1.donacionController.list);
        this.router.delete('/delete/:idbolsa', auth_1.validarToken, donacionController_1.donacionController.delete);
        this.router.post('/', auth_1.validarToken, donacionController_1.donacionController.create);
        this.router.put('/update/:idbolsa', auth_1.validarToken, donacionController_1.donacionController.update);
    }
}
exports.donacionRoutes = new DonacionRoutes();
exports.default = exports.donacionRoutes.router;
