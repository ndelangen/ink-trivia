'use strict';
const React = require('react');
const {Text, Color, Box} = require('ink');
const {default: SelectInput} = require('ink-select-input');
const { useAppState } = require('./state');
const arrayShuffle = require('array-shuffle');
const {feed: decode} = require('html-entity-decoder')

const ScoreBoard = ({ scores }) => {
	return (
		<Box marginBottom={1} flexDirection="row">
			{Object.entries(scores).reduce((acc, [name, score], i, l) => {
				const isLast = i === l.length -1;
				const isFirst = i === 0;

				const style = Object.assign(
					{},
					isLast || isFirst ? {flexGrow: 1} : {},
					isFirst ? { justifyContent: 'flex-end', alignItems: 'flex-end' } : {}
				);

				const element = (
					<Box key={name} {...style}>
						<Box flexDirection="column" justifyContent="center" alignItems="center">
							<Text><Color {...{[name]: true}}>{name} team</Color></Text>
							<Text>{score}</Text>
						</Box>
					</Box>
				);

				if (acc) {
					return acc.concat([
						<Box key={name+ '-sep'}> - VS - </Box>,
						element
					])
				}
				return [].concat(element)
			}, null)}
		</Box>
	)
}

const GameTimer = ({ timeRemaining }) => (
	<Box justifyContent="center" alignItems="center">
		<Box flexGrow={1} />
		<Text>------- time remaining: <Color blue>{(timeRemaining / 10).toFixed(1)}</Color> -------</Text>
		<Box flexGrow={1} />
	</Box>
);

const ActiveRound = ({ team, round }) => (
	<Box marginBottom={1} justifyContent="center" alignItems="center">
		<Box flexGrow={1} />
		<Text>Round {round + 1}, Current player is <Color {...{[team]: true}}>{team}</Color></Text>
		<Box flexGrow={1} />
	</Box>
);

const Question = ({ next, question }) => {
	const handleSelect = item => {
		next(item.value === true);
	};

	const items = React.useMemo(() => arrayShuffle(
		[
			{ label: decode(question.correct_answer), value: true }
		].concat(
			question.incorrect_answers.map((item, i) => ({ label: decode(item), value: i }))
		)
	), [question.question]);

	return <SelectInput items={items} onSelect={handleSelect}/>
};

const Winner = ({ scores }) => {
	const [winnerName, winnerScore] = Object.entries(scores).reduce(([topName, topScore], [name, score]) => {
		return score > topScore ? [name, score] : [topName, topScore];
	});

	return (
		<React.Fragment><Color {...{[winnerName]: true}}>{winnerName}</Color>, with {winnerScore} points!</React.Fragment>
	);
}

const App = ({ teams }) => {
	const [state, questions, count, next] = useAppState(teams);

	return state.round < 10 ? (
		<Box marginBottom={1} flexDirection="column">
			<ScoreBoard scores={state.scores} />
			<GameTimer timeRemaining={count} />
			<ActiveRound round={state.round} team={state.team} />
			{questions ? (
				<Box flexDirection="column" marginBottom={1} justifyContent="center" alignItems="center">
					<Box>{decode(questions[state.round].question)}</Box>
					<Question question={questions[state.round]} next={next} />
				</Box>
			) : null}
		</Box>
	) : (
		<Box marginBottom={1} flexDirection="column">
			<ScoreBoard scores={state.scores} />

			<Box justifyContent="center" alignItems="center">
				<Box flexGrow={1}/>
				<Text>CONGRATULATIONS team: <Winner scores={state.scores} /></Text>
				<Box flexGrow={1}/>
			</Box>
		</Box>
	);
}

module.exports = App;
