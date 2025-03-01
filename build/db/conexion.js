"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const estudianteModel_1 = require("../models/estudianteModel");
const profesoresModel_1 = require("../models/profesoresModel");
const cursoModel_1 = require("../models/cursoModel");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "cursos",
    entities: [estudianteModel_1.Estudiante, profesoresModel_1.Profesor, cursoModel_1.Curso],
    synchronize: true,
    logging: false,
});
