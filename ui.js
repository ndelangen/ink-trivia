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
				if(acc){
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

const GameTimer = () => (
	<Box justifyContent="center" alignItems="center">
		<Box flexGrow={1} />
		<Text>------- time remaining: <Counter /> -------</Text>
		<Box flexGrow={1} />
	</Box>
)

const Counter = ({ startCount = 6000, interval = 10}) => {
	const [count, setCount] = React.useState(startCount);
	const done = count === 0;
	
	const ref = React.useRef(count);
  ref.current = count;
	
	React.useEffect(() => {
		let timer;
		if (!done) {
			timer = setInterval(() => { setCount(ref.current - 1)}, interval);
		}
		return () => {
			if (timer) {
				clearInterval(timer);
			}
		}
	}, [interval, done]);

	return (
		<Color blue>
			{(count / 100).toFixed(2)}
		</Color>
	);
}
const App = () => (
	<Box marginBottom={1} flexDirection="column">
		<ScoreBoard scores={{red: 0, green: 1}} />
		<GameTimer />
	</Box>
);

module.exports = App;
