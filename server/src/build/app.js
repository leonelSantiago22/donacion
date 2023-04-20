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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const database_1 = __importDefault(require("./database"));
const correoAcceso = require("./correoAcceso");
class Server {
    constructor() {
        this.queryProfesor = (decodificado) => {
            return new Promise((resolve, reject) => {
                let consulta = 'SELECT correo FROM enfermera WHERE correo="' + decodificado + '"';
                database_1.default.query(consulta, (error, results) => {
                    if (error)
                        return reject(error);
                    return resolve(results);
                });
            });
        };
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use(express_1.default.static(__dirname + "/img"));
    }
    config() {
        this.app.use(express_1.default.urlencoded({
            limit: "50mb",
            parameterLimit: 100000,
            extended: false,
        }));
        this.app.use(express_1.default.json({ limit: "50mb" }));
        this.app.set("port", process.env.PORT || 3001);
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.post("/enviarCorreoRecuperarContrasenya", (req, res) => {
            console.log("mandando el correo");
            correoAcceso(req.body);
        });
        this.app.post("/decodificarMail", (req, res) => __awaiter(this, void 0, void 0, function* () {
            let decodificado;
            try {
                decodificado = jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET || "prueba");
                console.log(decodificado);
                const result1 = (yield this.queryProfesor(decodificado));
                console.log(result1);
                if (result1.length == 0)
                    res.json(0);
                else
                    res.json(result1[0]);
            }
            catch (err) {
                res.json(0);
            }
        }));
        this.app.post("/uploadImagen", (req, res) => {
            const file = req.body.src;
            const carpeta = req.body.carpeta;
            const name = req.body.id;
            console.log(carpeta, name);
            const binaryData = Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""), "base64").toString("binary");
            fs_1.default.writeFile(`${__dirname}/img/` + carpeta + "/" + name + ".jpg", binaryData, "binary", (err) => {
                console.log(err);
            });
            res.json({ fileName: name + ".jpg" });
        });
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Listening on port ${this.app.get("port")}`);
        });
    }
}
const server = new Server();
server.start();
