"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.administradorController = void 0;
const database_1 = __importDefault(require("../database"));
class AdministradorController {
    verificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT numero_trabajador FROM administrador WHERE numero_trabajador="${req.body.numero_trabajador}" and password="${req.body.password}"`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length == 0) {
                console.log("null");
                res.json(null);
                return;
            }
            else {
                res.json(respuesta[0]);
                return;
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { numero_trabajador } = req.params;
            const consulta = 'SELECT numero_trabajador,nombre FROM administrador WHERE numero_trabajador = ' + numero_trabajador;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Donador no encontrado' });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const consulta = 'SELECT * FROM administrador';
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
}
exports.administradorController = new AdministradorController();
