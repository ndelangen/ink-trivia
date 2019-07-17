'use strict';
const React = require('react');
const {Text, Color, Box} = require('ink');

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

const useCount = (startCount = 60, gameSpeed = 100) => {
	const [count, setCount] = React.useState(startCount);
	const done = count === 0;
	
	const ref = React.useRef(count);
  ref.current = count;
	
	React.useEffect(() => {
		let timer;
		if (!done) {
			timer = setInterval(() => { setCount(ref.current - 1)}, gameSpeed);
		}
		return () => {
			if (timer) {
				clearInterval(timer);
			}
		}
	}, [gameSpeed, done]);

	return [count, setCount];
}

const teams = ['red', 'green'];

const useAppState = (teams) => {
	const [count, setCount] = useCount();
	const [state, setState] = React.useState({ 
		team: teams[0],
		round: 0,
		scores: teams.reduce((acc, i) => Object.assign(acc, {[i]: 0}), {}),
		question: undefined,
	});

	const next = (amount) => {
		setCount(600);
		setState({
			team: teams.reduce((acc, t, i, l) => {
				if (acc) {
					return acc;
				}
				if (state.team === t && i < l.length -1) {
					return l[i+1];
				}
				if (state.team === t && i === l.length -1) {
					return l[0];
				}
				}, false),
			round: state.round = 1,
			scores: {
				...state.scores,
				[state.team]: state.scores[state.team] + amount,
			},
		})
	}

	if(count === 0) {
		next(0);
	}

	return [state, count, next]
}

const App = () => {
	const [state, count, next] = useAppState(teams);

	return (
		<Box marginBottom={1} flexDirection="column">
			<ScoreBoard scores={state.scores} />
			<GameTimer timeRemaining={count} />
			<ActiveRound round={state.round} team={state.team} />
		</Box>
	);
}

module.exports = App;
