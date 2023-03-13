"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hospitalRoutes = void 0;
const express_1 = require("express");
const hospitalController_1 = require("../controllers/hospitalController");
const auth_1 = require("../middleware/auth");
class HospitalRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, hospitalController_1.hospitalController.list);
        this.router.delete('/delete/:idhospital', auth_1.validarToken, hospitalController_1.hospitalController.delete);
        this.router.post('/', auth_1.validarToken, hospitalController_1.hospitalController.create);
        this.router.put('/update/:idhospital', auth_1.validarToken, hospitalController_1.hospitalController.update);
        this.router.get('/list/:idhospital', auth_1.validarToken, hospitalController_1.hospitalController.listOne);
    }
}
exports.hospitalRoutes = new HospitalRoutes();
exports.default = exports.hospitalRoutes.router;
