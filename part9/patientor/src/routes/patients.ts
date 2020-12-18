import express from "express";
import { addPatient, getNonSensitivePatientData, parseNewPatientData } from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
	const patients = getNonSensitivePatientData();
	res.send(patients);
});

router.post('/', (req, res) => {
	try {
		const data = parseNewPatientData(req.body);
		const newPatient = addPatient(data);
		res.send(newPatient);
	} catch (e) {
		res.status(400).send({ error: (e as Error).message });
	}
});

export default router;
