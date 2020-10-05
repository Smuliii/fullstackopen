interface ExerciseResult {
	totalDays: number,
	trainingDays: number,
	target: number,
	avgTime: number,
	targetReached: boolean,
	rating: number,
	summary: string,
}

interface Ratings {
	[key: number]: string
}

export default function calculateExercises(exercises: number[]): ExerciseResult {
	const ratings: Ratings = {
		1: 'Meh',
		2: 'Ok',
		3: 'Great',
	};
	const target = exercises.shift() || 0;

	const result = {
		totalDays: exercises.length,
		trainingDays: exercises.filter(day => day > 0).length,
		avgTime: exercises.reduce((item, sum) => sum + item) / exercises.length,
		target,
		targetReached: false,
		rating: 1,
		summary: '',
	};

	result.targetReached = result.avgTime >= result.target;
	result.rating =  Math.floor(Math.min(Math.max(result.avgTime / result.target, 0), 2)) + 1;
	result.summary = ratings[result.rating];

	return result;
}

// CLI
if (require.main === module) {
	const exercises = process.argv.slice(2);

	if (exercises.length < 2 || exercises.find(value => Number.isNaN(Number(value)))) {
		console.error('Invalid arguments');
	} else {
		console.log(calculateExercises(exercises.map(value => Number(value))));
	}
}
