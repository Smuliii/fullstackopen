"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNewPatientData = exports.addPatient = exports.getNonSensitivePatientData = exports.getPatients = exports.Gender = void 0;
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const utils_1 = require("../utils");
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
const patients = patients_json_1.default;
// const isGender = (gender: unknown): gender is Gender => {
// };
const getPatients = () => {
    return patients;
};
exports.getPatients = getPatients;
const getNonSensitivePatientData = () => {
    return patients.map(patient => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    }));
};
exports.getNonSensitivePatientData = getNonSensitivePatientData;
const addPatient = (data) => {
    const newPatient = Object.assign({ id: String(Math.floor(Math.random() * 100000)) }, data);
    patients.push(newPatient);
    return newPatient;
};
exports.addPatient = addPatient;
const parseNewPatientData = (data) => {
    if (typeof data !== 'object' || !data) {
        throw new Error("Invalid data");
    }
    const validations = {
        name: (name) => utils_1.isString(name),
        dateOfBirth: (dateOfBirth) => utils_1.isString(dateOfBirth) && utils_1.isDate(dateOfBirth),
        ssn: (ssn) => utils_1.isString(ssn),
        gender: (gender) => utils_1.isString(gender),
        occupation: (occupation) => utils_1.isString(occupation),
    };
    Object.entries(validations).forEach(([key, test]) => {
        const value = data[key];
        if (typeof value === 'undefined' || !test(value)) {
            throw new Error(`Invalid value for: ${key}`);
        }
    });
    return data;
};
exports.parseNewPatientData = parseNewPatientData;
