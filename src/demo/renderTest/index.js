/* eslint-disable */
import React, { Component, PureComponent, Fragment } from 'react';

class PureCompChild extends React.PureComponent {
	render() {
		console.error('PureCompChild render....');
		return <div className="pure-comp-child">PureCompChild</div>;
	}
}

class CompChild extends React.Component {
	render() {
		console.error('CompChild render....');
		return <div className="comp-child">CompChild</div>;
	}
}

function FunChild() {
	console.error('FunChild perform....');
	return <div className="fun-child">FunChild</div>;
}

class Parent extends React.Component {
	state = {
		value: 'parent',
	};

	handleChangeState = e => {
		this.setState({ value: e.target.value });
	};

	render() {
        const { value } = this.state
		return (
			<Fragment>
				<PureCompChild />
				<CompChild  />
				<FunChild  />
				<input
					placeholder="更改父组件状态"
					value={this.state.value}
					onChange={this.handleChangeState}
				/>
			</Fragment>
		);
	}
}

export default Parent;
