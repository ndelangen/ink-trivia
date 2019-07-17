'use strict';
const React = require('react');
const {Text, Color, Box} = require('ink');

const { useAppState } = require('./state');

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

const App = ({ teams }) => {
	const [state, questions, count, next] = useAppState(teams);

	return (
		<Box marginBottom={1} flexDirection="column">
			<ScoreBoard scores={state.scores} />
			<GameTimer timeRemaining={count} />
			<ActiveRound round={state.round} team={state.team} />
			{questions ? (
				<Box flexDirection="column" marginBottom={1} justifyContent="center" alignItems="center">
					<Box>{questions[state.round].question}</Box>
					<Box>{questions[state.round].correct_answer}</Box>
					{questions[state.round].incorrect_answers.map(i => (
						<Box>{i}</Box>
					))}
				</Box>
			) : null}
		</Box>
	);
}

module.exports = App;
