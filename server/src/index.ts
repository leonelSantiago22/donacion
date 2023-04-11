import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import pool from "./database";
import indexRoutes from './routes/indexRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import solicitudRoutes from './routes/solicitudRoutes';
import pacienteRoutes from './routes/pacienteRoutes';
import personaRoutes from './routes/personaRoutes';
import donadorRoutes from './routes/donadorRoutes';
import bancoRoutes from './routes/bancoRoutes';
import bolsaRoutes from './routes/bolsaRoutes';
import donacionRoutes from './routes/donacionRoutes';
import inventarioRoutes from './routes/inventarioRoutes';
import registroRoutes from './routes/registroRoutes';
import transfucionRoutes from './routes/transfucionRoutes';
import enfermeraRoutes from './routes/enfermeraRoutes';
import administradorRoutes from "./routes/administradorRoutes";
import hospitalRoutes from "./routes/hospitalRoutes";
class Server {
    public app : Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use(express.static(__dirname + "/img"));
        this.app.use('/documentacion',swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }
    config() : void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    routes() : void {
        this.app.use(indexRoutes);
        this.app.use('/api/usuarios', usuarioRoutes);
        this.app.use('/api/solicitud', solicitudRoutes);
        this.app.use('/api/paciente',pacienteRoutes);
        this.app.use('/api/persona', personaRoutes);
        this.app.use('/api/donador', donadorRoutes);
        this.app.use('/api/banco', bancoRoutes);
        this.app.use('/api/bolsa', bolsaRoutes);
        this.app.use('/api/donacion', donacionRoutes);
        this.app.use('/api/inventario', inventarioRoutes);
        this.app.use('/api/registro',registroRoutes);
        this.app.use('/api/transfucion', transfucionRoutes);
        this.app.use('/api/enfermera', enfermeraRoutes);
        this.app.use('/api/administrador', administradorRoutes);
        this.app.use('/api/hospital', hospitalRoutes);
        this.app.post("/uploadImagen", (req, res) => {
          const file = req.body.src;
          const name = req.body.id;
          const carpeta = req.body.carpeta;
          const binaryData = Buffer.from(
            file.replace(/^data:image\/[a-z]+;base64,/, ""),"base64").toString("binary");
          fs.writeFile(
            `${__dirname}/img/` + carpeta + "/" + name + ".jpg",
            binaryData,
            "binary",
            (err) => {
              console.log(err);
            }
          );
          res.json({ fileName: name + ".jpg" });
        });
    }
    start() : void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
