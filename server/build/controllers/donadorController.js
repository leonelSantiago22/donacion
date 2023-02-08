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
exports.donadorController = void 0;
const database_1 = __importDefault(require("../database"));
class DonadorController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const consulta = 'SELECT * FROM donador';
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { iddonador } = req.params;
            const consulta = 'SELECT * FROM donador WHERE iddonador = ' + iddonador;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Donador no encontrado' });
        });
    }
    listOneCartesiano(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { iddonador, idpersona } = req.params;
            const consulta = `SELECT persona.idpersona,donador.iddonador,donador.tipodesangre,persona.nombre,persona.edad,persona.genero FROM donador,persona WHERE donador.idpersona =${idpersona} and persona.idpersona=${idpersona} and donador.iddonador=${iddonador}`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Donador no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            const resp = yield database_1.default.query("INSERT INTO donador set ?", [req.body]); //recibira los parametros por el body
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { iddonador } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM donador WHERE iddonador= ${iddonador}`);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { iddonador } = req.params;
            console.log("se actualizan los datos:", req.body);
            const resp = yield database_1.default.query("UPDATE donador set ? WHERE iddonador = ?", [req.body, iddonador]);
            res.json(resp);
            console.log(resp);
        });
    }
}
exports.donadorController = new DonadorController();
