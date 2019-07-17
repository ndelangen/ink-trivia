'use strict';
const React = require('react');
const {Text, Color, Box} = require('ink');

class Counter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			i: 0
		};
	}

	render() {
		return (
			<React.Fragment>
				{this.state.i}
			</React.Fragment>
		);
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({
				i: this.state.i + 1
			});
		}, 100);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}
}
const App = () => (
	<Box marginBottom={1} flexDirection="row">
		<Box flexGrow={1} justifyContent="flex-end" alignItems="flex-end">
			<Box flexDirection="column" justifyContent="center" alignItems="center">
				<Text><Color green>Green team</Color></Text>
				<Counter />
			</Box>
		</Box>
		
		<Box> - VS - </Box>
		
		<Box flexGrow={1}>
			<Box flexDirection="column" justifyContent="center" alignItems="center">
				<Text><Color red>Red team</Color></Text>
				<Counter />
			</Box>
		</Box>
	</Box>
);

module.exports = App;
