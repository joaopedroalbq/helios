import React, { Component } from 'react';
import threeEntryPoint from './ThreeEntryPoint';

export default class ThreeContainer extends Component {

	componentDidMount() {
		threeEntryPoint();
	}

	render() {
		return (
			<canvas id="helios"></canvas>
		);
	}
}
