"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donacionRoutes = void 0;
const express_1 = require("express");
const donacionController_1 = require("../controllers/donacionController");
class DonacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', donacionController_1.donacionController.list);
        this.router.delete('/delete/:idbolsa', donacionController_1.donacionController.delete);
        this.router.post('/', donacionController_1.donacionController.create);
        this.router.put('/update/:idbolsa', donacionController_1.donacionController.update);
    }
}
exports.donacionRoutes = new DonacionRoutes();
exports.default = exports.donacionRoutes.router;
