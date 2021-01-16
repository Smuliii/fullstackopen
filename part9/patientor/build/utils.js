"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.isString = void 0;
const isString = (text) => {
    return typeof text === 'string';
};
exports.isString = isString;
const isDate = (date) => {
    return !!Date.parse(date);
};
exports.isDate = isDate;
