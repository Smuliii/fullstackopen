export default function calculateBmi(height: number, weight: number): string {
	const categories = {
		'Underweight': [0, 18.5],
		'Normal (healthy weight)': [18.5, 25],
		'Overweight': [25],
	};

	const bmi = (weight / height ** 2 * 10000);

	for (const [category, minmax] of Object.entries(categories)) {
		const [min, max]: number[] = minmax;
		if (bmi >= min && (!max || bmi <= max)) {
			return category;
		}
	}

	return 'Something went wrong';
}

// CLI
if (require.main === module) {
	const [height, weight] = process.argv.slice(2);

	if (!height || !weight || Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
		console.error('Invalid arguments');
	} else {
		console.log(calculateBmi(Number(height), Number(weight)));
	}
}
