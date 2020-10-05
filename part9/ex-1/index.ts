import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

interface ExercisesRequest {
	body: {
		target: number,
		daily_exercises: number[],
	}
}

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight || Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
		res.status(400).json({ error: 'invalid parameters' });
	} else {
		const bmi = calculateBmi(Number(height), Number(weight));
		res.json({ height, weight, bmi });
	}
});

app.post('/exercises', (req: ExercisesRequest, res) => {
	const { target, daily_exercises: exercises } = req.body;

	if (!target || !Array.isArray(exercises) || exercises.length < 2 || (exercises).find((value: string | number) => Number.isNaN(Number(value)))) {
		res.status(400).json({ error: 'invalid parameters' });
	} else {
		const values = ([target, ...exercises] as unknown[]).map((value: number) => Number(value));
		const result = calculateExercises(values);
		res.json(result);
	}
});

app.listen(3000, () => console.log('Server is running'));
