import express from "express";
import { addPatient, getPatient, getNonSensitivePatientData, parseNewPatientData, parseNewEntryData, addEntry } from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
	const patients = getNonSensitivePatientData();
	res.send(patients);
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const patient = getPatient(id);
	if (patient) {
		res.send(patient);
	} else {
		res.status(404).send({ error: 'patient not found' });
	}
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

router.post('/:id/entries', (req, res) => {
	try {
		const { id } = req.params;
		const data = parseNewEntryData(id, req.body);
		const newEntry = addEntry(id, data);
		res.send(newEntry);
	} catch (e) {
		res.status(400).send({ error: (e as Error).message });
	}
});

export default router;
