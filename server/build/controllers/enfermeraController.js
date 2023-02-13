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
exports.enfermeraController = void 0;
const database_1 = __importDefault(require("../database"));
class EnfermeraController {
    verificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT numero_trabajador FROM enfermera WHERE numero_trabajador="${req.body.numero_trabajador}" and password="${req.body.password}"`;
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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const consulta = 'SELECT * FROM enfermera';
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { numero_trabajador } = req.params;
            const consulta = 'SELECT * FROM enfermera WHERE numero_trabajador = ' + numero_trabajador;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Trabajador no encontrado' });
        });
    }
    listOneCatersioano(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { numero_trabajador, idpersona } = req.params;
            const consulta = `SELECT enfermera.numero_trabajador,enfermera.idhospital,enfermera.idpersona,persona.nombre,persona.edad,persona.genero,enfermera.password FROM enfermera,persona WHERE enfermera.numero_trabajador = ${numero_trabajador} and persona.idpersona = ${idpersona} and enfermera.idpersona = ${idpersona}`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Trabajador no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            const resp = yield database_1.default.query("INSERT INTO enfermera set ?", [req.body]); //recibira los parametros por el body
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numero_trabajador } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM enfermera WHERE numero_trabajador= ${numero_trabajador}`);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numero_trabajador } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE enfermera set ? WHERE numero_trabajador = ?", [req.body, numero_trabajador]);
            res.json(resp);
        });
    }
    createDP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Create Dp");
            console.log(req.params);
            const { nombre, edad, genero, idhospital, password } = req.body;
            const setIdPersona = yield database_1.default.query("SET @idpersona = 0;");
            const insertPersona = yield database_1.default.query("INSERT INTO persona(nombre, edad, genero) VALUES(?, ?, ?);", [nombre, edad, genero]);
            const setId = yield database_1.default.query(" SET @idpersona = LAST_INSERT_ID();");
            const getIdPersona = yield database_1.default.query("SELECT idpersona as idp from persona where idpersona = (select MAX(idpersona) from persona);");
            const idpersona = getIdPersona[0].idp;
            const resp2 = yield database_1.default.query(`INSERT INTO enfermera (numero_trabajador,idhospital ,idpersona,password)VALUES (NULL,${idhospital},${idpersona},"${password}");`);
            res.json({ setIdPersona, insertPersona, setId, getIdPersona, resp2 });
        });
    }
    actualizarDP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { nombre, edad, genero, idhospital, password } = req.body;
            const { numero_trabajador } = req.params;
            const updatePersona = yield database_1.default.query("UPDATE persona SET nombre=?, edad=?, genero=? WHERE idpersona=?", [nombre, edad, genero, req.params.idpersona]);
            const updateDonador = yield database_1.default.query(`UPDATE enfermera SET idhospital=${idhospital},password="${password}" WHERE numero_trabajador=${numero_trabajador};`);
            console.log(updateDonador);
            res.json({ updatePersona, updateDonador });
        });
    }
}
exports.enfermeraController = new EnfermeraController();
