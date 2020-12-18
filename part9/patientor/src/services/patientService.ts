import patientsData from "../../data/patients.json";
import { isDate, isString } from "../utils";

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;

const patients = patientsData as Patient[];

const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender).includes(gender as Gender);
};

export const getPatients = (): Patient[] => {
	return patients;
};

export const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
	return patients.map(patient => ({
		id: patient.id,
		name: patient.name,
		dateOfBirth: patient.dateOfBirth,
		gender: patient.gender,
		occupation: patient.occupation,
	}));
};

export const addPatient = (data: NewPatient): Patient => {
	const newPatient = {
		id: String(Math.floor(Math.random() * 100000)),
		...data
	};

	patients.push(newPatient);

	return newPatient;
};

export const parseNewPatientData = (data: Partial<NewPatient>): NewPatient => {
	if (typeof data !== 'object' || !data) {
		throw new Error("Invalid data");
	}

	const validations = {
		name: (name: unknown) => isString(name),
		dateOfBirth: (dateOfBirth: unknown) => isString(dateOfBirth) && isDate(dateOfBirth) ,
		ssn: (ssn: unknown) => isString(ssn),
		gender: (gender: unknown) => isString(gender) && isGender(gender),
		occupation: (occupation: unknown) => isString(occupation),
	};

	Object.entries(validations).forEach(([key, test]) => {
		const value = data[key as keyof Partial<NewPatient>] as unknown;
		if (typeof value === 'undefined' || !test(value)) {
			throw new Error(`Invalid value for: ${key}`);
		}
	});

	return data as NewPatient;
};
