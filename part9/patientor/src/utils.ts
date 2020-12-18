export const isString = (text: unknown): text is string => {
	return typeof text === 'string';
};

export const isDate = (date: string): boolean => {
	return !!Date.parse(date);
};
