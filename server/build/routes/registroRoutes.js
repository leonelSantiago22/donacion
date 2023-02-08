"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registroRoutes = void 0;
const express_1 = require("express");
const registroController_1 = require("../controllers/registroController");
class RegistroRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', registroController_1.registroController.list);
        this.router.delete('/delete/:idbolsa', registroController_1.registroController.delete);
        this.router.post('/', registroController_1.registroController.create);
        this.router.put('/update/:idbolsa', registroController_1.registroController.update);
    }
}
exports.registroRoutes = new RegistroRoutes();
exports.default = exports.registroRoutes.router;
