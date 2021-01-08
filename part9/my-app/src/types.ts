// new types
interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartExtended extends CoursePartBase {
	description: string;
}

interface CoursePartOne extends CoursePartExtended {
	name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
	name: "Using props to pass data";
	groupProjectCount: number;
}

interface CoursePartThree extends CoursePartExtended {
	name: "Deeper type usage";
	exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartExtended {
	name: "Final test";
	dueDate: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
