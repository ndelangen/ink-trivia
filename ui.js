'use strict';
const React = require('react');
const {Color, Box} = require('ink');

class Counter extends React.Component {
	constructor() {
		super();

		this.state = {
			i: 0
		};
	}

	render() {
		return (
			<React.Fragment>
				{this.state.i} tests passed
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
		<Color green>
			<Counter />
		</Color>
		<Box flexGrow={1}></Box>
		<Color red>
			<Counter />
		</Color>
	</Box>
);

module.exports = App;
