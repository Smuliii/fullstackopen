import diagnosesData from "../../data/diagnoses.json";

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

const diagnoses: Diagnose[] = diagnosesData;

export const getDiagnoses = (): Diagnose[] => {
	return diagnoses;
};
