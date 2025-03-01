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
Object.defineProperty(exports, "__esModule", { value: true });
const cursoModel_1 = require("../models/cursoModel");
const profesoresModel_1 = require("../models/profesoresModel");
const estudianteModel_1 = require("../models/estudianteModel");
class CursosController {
    constructor() {
    }
    consultar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield cursoModel_1.Curso.find({ relations: { profesor: true, estudiantes: true } });
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    consultarDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield cursoModel_1.Curso.findOne({ where: { id: Number(id) }, relations: { profesor: true, estudiantes: true } });
                if (!registro) {
                    throw new Error('Curso no encontrado');
                }
                res.status(200).json(registro);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ingresar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { profesor } = req.body;
                const profesorRegistro = yield profesoresModel_1.Profesor.findOneBy({ id: Number(profesor) });
                if (!profesorRegistro) {
                    throw new Error('Profesor no encontrado');
                }
                const registro = yield cursoModel_1.Curso.save(req.body);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const { profesor } = req.body;
                const profesorRegistro = yield profesoresModel_1.Profesor.findOneBy({ id: Number(profesor) });
                if (!profesorRegistro) {
                    throw new Error('Profesor no encontrado');
                }
                const registro = yield cursoModel_1.Curso.findOneBy({ id: Number(id) });
                if (!registro) {
                    throw new Error('Curso no encontrado');
                }
                yield cursoModel_1.Curso.update({ id: Number(id) }, req.body);
                const registroActualizado = yield cursoModel_1.Curso.findOne({ where: { id: Number(id) }, relations: { profesor: true, estudiantes: true } });
                res.status(200).json(registroActualizado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const registro = yield cursoModel_1.Curso.findOneBy({ id: Number(id) });
                if (!registro) {
                    throw new Error('Curso no encontrado');
                }
                yield cursoModel_1.Curso.delete({ id: Number(id) });
                res.status(204);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    asociarEstudiante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const { estudiante_id, curso_id } = req.body;
                const estudiante = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(estudiante_id) });
                const curso = yield cursoModel_1.Curso.findOneBy({ id: Number(curso_id) });
                if (!estudiante) {
                    throw new Error('Estudiante no encontrado');
                }
                if (!curso) {
                    throw new Error('Curso no encontrado');
                }
                curso.estudiantes = curso.estudiantes || [];
                curso.estudiantes.push(estudiante);
                const registro = yield cursoModel_1.Curso.save(curso);
                res.status(200).json(registro);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new CursosController();
