import diagnosesData from "../data/diagnoses.json";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

export const getDiagnoses = (): Diagnosis[] => {
	return diagnoses;
};
