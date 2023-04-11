"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const solicitudRoutes_1 = __importDefault(require("./routes/solicitudRoutes"));
const pacienteRoutes_1 = __importDefault(require("./routes/pacienteRoutes"));
const personaRoutes_1 = __importDefault(require("./routes/personaRoutes"));
const donadorRoutes_1 = __importDefault(require("./routes/donadorRoutes"));
const bancoRoutes_1 = __importDefault(require("./routes/bancoRoutes"));
const bolsaRoutes_1 = __importDefault(require("./routes/bolsaRoutes"));
const donacionRoutes_1 = __importDefault(require("./routes/donacionRoutes"));
const inventarioRoutes_1 = __importDefault(require("./routes/inventarioRoutes"));
const registroRoutes_1 = __importDefault(require("./routes/registroRoutes"));
const transfucionRoutes_1 = __importDefault(require("./routes/transfucionRoutes"));
const enfermeraRoutes_1 = __importDefault(require("./routes/enfermeraRoutes"));
const administradorRoutes_1 = __importDefault(require("./routes/administradorRoutes"));
const hospitalRoutes_1 = __importDefault(require("./routes/hospitalRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use(express_1.default.static(__dirname + "/img"));
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/usuarios', usuarioRoutes_1.default);
        this.app.use('/api/solicitud', solicitudRoutes_1.default);
        this.app.use('/api/paciente', pacienteRoutes_1.default);
        this.app.use('/api/persona', personaRoutes_1.default);
        this.app.use('/api/donador', donadorRoutes_1.default);
        this.app.use('/api/banco', bancoRoutes_1.default);
        this.app.use('/api/bolsa', bolsaRoutes_1.default);
        this.app.use('/api/donacion', donacionRoutes_1.default);
        this.app.use('/api/inventario', inventarioRoutes_1.default);
        this.app.use('/api/registro', registroRoutes_1.default);
        this.app.use('/api/transfucion', transfucionRoutes_1.default);
        this.app.use('/api/enfermera', enfermeraRoutes_1.default);
        this.app.use('/api/administrador', administradorRoutes_1.default);
        this.app.use('/api/hospital', hospitalRoutes_1.default);
        this.app.post("/uploadImagen", (req, res) => {
            const file = req.body.src;
            const name = req.body.id;
            const carpeta = req.body.carpeta;
            const binaryData = Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""), "base64").toString("binary");
            fs_1.default.writeFile(`${__dirname}/img/` + carpeta + "/" + name + ".jpg", binaryData, "binary", (err) => {
                console.log(err);
            });
            res.json({ fileName: name + ".jpg" });
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
