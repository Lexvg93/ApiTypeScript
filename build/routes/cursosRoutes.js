"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cursosController_1 = __importDefault(require("../controllers/cursosController"));
const router = express_1.default.Router();
router.get('/', cursosController_1.default.consultar);
router.post('/', cursosController_1.default.ingresar);
router.post('/regitraEstudiante', cursosController_1.default.asociarEstudiante);
router.route('/:id')
    .get(cursosController_1.default.consultarDetalle)
    .put(cursosController_1.default.actualizar)
    .delete(cursosController_1.default.borrar);
exports.default = router;
