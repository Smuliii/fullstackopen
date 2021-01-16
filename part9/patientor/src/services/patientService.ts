import patientsData from '../data/patients';
import { assertNever, generateId, isDate, isNumber, isObject, isString, validateData, Validations } from '../utils';
import { Patient, Gender, PublicPatient, NewPatient, Entry, NewEntry, NewEntryData, HealthCheckRating, } from '../types';

const patients = patientsData;

const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender).includes(gender as Gender);
};

export const getPatients = (): Patient[] => {
	return patients;
};

export const getPatient = (id: string): Patient | false => {
	return patients.find(patient => patient.id === id) || false;
};

export const getNonSensitivePatientData = (): PublicPatient[] => {
	return patients.map(patient => ({
		id: patient.id,
		name: patient.name,
		dateOfBirth: patient.dateOfBirth,
		gender: patient.gender,
		occupation: patient.occupation,
		entries: [],
	}));
};

export const addPatient = (data: NewPatient): Patient => {
	const newPatient = {
		id: generateId(),
		...data
	};

	patients.push(newPatient);

	return newPatient;
};

export const addEntry = (id: string, data: NewEntry): Entry => {
	const patient = getPatient(id) as Patient;
	const newEntry = {
		id: generateId(),
		...data,
	} as Entry;
	patient.entries.push(newEntry);

	return newEntry;
};

export const parseNewPatientData = (data: Partial<NewPatient>): NewPatient => {
	const validations = {
		name: (name: unknown) => isString(name),
		dateOfBirth: (dateOfBirth: unknown) => isString(dateOfBirth) && isDate(dateOfBirth) ,
		ssn: (ssn: unknown) => isString(ssn),
		gender: (gender: unknown) => isString(gender) && isGender(gender),
		occupation: (occupation: unknown) => isString(occupation),
	};

	validateData(data, validations);

	return data as NewPatient;
};

export const parseNewEntryData = (id: string, data: NewEntryData): NewEntry => {
	const baseValidations = {
		description: (description: unknown) => isString(description),
		date: (date: unknown) => isString(date) && isDate(date),
		specialist: (specialist: unknown) => isString(specialist),
	};

	const typeValidations = {
		'HealthCheck': {
			healthCheckRating: (healthCheckRating: unknown) => isNumber(healthCheckRating) && healthCheckRating in HealthCheckRating,
		},
		'Hospital': {
			discharge: (discharge: unknown) => isObject(discharge) && isString(discharge.date) && isDate(discharge.date) && isString(discharge.criteria),
		},
		'OccupationalHealthcare': {
			employerName: (employerName: unknown) => isString(employerName),
		},
	};

	const patient = getPatient(id);

	if (!patient) {
		throw new Error('Invalid patient id');
	}

	let validations: Validations = {};

	if (isObject(data)) {
		switch (data.type) {
			case 'HealthCheck':
			case 'Hospital':
			case 'OccupationalHealthcare':
				validations = { ...baseValidations, ...typeValidations[data.type] };
				break;
			default:
				assertNever(data);
		}
	}

	validateData(data, validations);

	return data as NewEntry;
};
