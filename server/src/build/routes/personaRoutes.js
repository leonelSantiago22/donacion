"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaRoutes = void 0;
const express_1 = require("express");
const personaController_1 = require("../controllers/personaController");
const auth_1 = require("../middleware/auth");
class PersonaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, personaController_1.personaController.list);
        this.router.get('/max', auth_1.validarToken, personaController_1.personaController.listMax);
        this.router.delete('/delete/:idpersona', auth_1.validarToken, personaController_1.personaController.delete);
        this.router.post('/', auth_1.validarToken, personaController_1.personaController.create);
        this.router.put('/update/:idpersona', auth_1.validarToken, personaController_1.personaController.update);
        this.router.get('/list/:idpersona', auth_1.validarToken, personaController_1.personaController.listOne);
    }
}
exports.personaRoutes = new PersonaRoutes();
exports.default = exports.personaRoutes.router;
