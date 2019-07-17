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
			<Color green>
				{this.state.i} tests passed
			</Color>
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
	<Box marginBottom={1} flexDirection="column">
		<Counter />
	</Box>
);

module.exports = App;
