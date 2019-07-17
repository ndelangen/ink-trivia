#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ ink-demo

	Options
		--name  Your name

	Examples
	  $ ink-demo --name=Jane
	  Hello, Jane
`);

const teams = ['red', 'green'];

const defaults = { teams };

render(React.createElement(ui, {...defaults, ...cli.flags}));
