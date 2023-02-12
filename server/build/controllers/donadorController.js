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
    createDP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Create Dp");
            console.log(req.params);
            const { nombre, edad, genero, tipodesangre } = req.body;
            const setIdPersona = yield database_1.default.query("SET @idpersona = 0;");
            const insertPersona = yield database_1.default.query("INSERT INTO persona(nombre, edad, genero) VALUES(?, ?, ?);", [nombre, edad, genero]);
            const setId = yield database_1.default.query(" SET @idpersona = LAST_INSERT_ID();");
            const getIdPersona = yield database_1.default.query("SELECT idpersona as idp from persona where idpersona = (select MAX(idpersona) from persona);");
            const idpersona = getIdPersona[0].idp;
            const resp2 = yield database_1.default.query(`INSERT INTO donador (tipodesangre, idpersona)VALUES ("${tipodesangre}",${idpersona});`);
            res.json({ setIdPersona, insertPersona, setId, getIdPersona, resp2 });
        });
    }
    actualizarDP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { nombre, edad, genero, tipodesangre } = req.body;
            const { iddonador } = req.params;
            const updatePersona = yield database_1.default.query("UPDATE persona SET nombre=?, edad=?, genero=? WHERE idpersona=?", [nombre, edad, genero, req.params.idpersona]);
            const updateDonador = yield database_1.default.query(`UPDATE donador SET tipodesangre=? WHERE iddonador=${iddonador};`, [tipodesangre]);
            res.json({ updatePersona, updateDonador });
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
