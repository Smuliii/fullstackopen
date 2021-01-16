"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = patientService_1.getNonSensitivePatientData();
    res.send(patients);
});
router.post('/', (req, res) => {
    try {
        const data = patientService_1.parseNewPatientData(req.body);
        const newPatient = patientService_1.addPatient(data);
        res.send(newPatient);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
exports.default = router;
