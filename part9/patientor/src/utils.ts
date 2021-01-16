export interface Validations {
	[key: string]: (value: unknown) => boolean
}

export const generateId = (): string => String(Math.floor(Math.random() * 100000));

export const isString = (text: unknown): text is string => {
	return typeof text === 'string';
};

export const isNumber = (text: unknown): text is number => {
	return typeof text === 'number';
};

export const isDate = (date: string): boolean => {
	return !!Date.parse(date);
};

export const isObject = (object: unknown): object is Record<string, unknown> => {
	return typeof object === 'object' && !!object;
};

export const validateData = (data: Record<string, unknown>, validations: Validations): void => {
	if (!isObject(data) || !isObject(validations)) {
		throw new Error("Invalid data");
	}

	Object.entries(validations).forEach(([key, test]) => {
		const value = data[key];
		if (typeof value === 'undefined' || !test(value)) {
			throw new Error(`Invalid value (${JSON.stringify(value)}) for: ${key}`);
		}
	});
};

export const assertNever = (value: never): never => {
	throw new Error(`Type missing: ${JSON.stringify(value)}`);
};
