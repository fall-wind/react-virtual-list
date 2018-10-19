/* eslint-disable */
import React, { Component, PureComponent, Fragment } from 'react';

// class PureCompChild extends React.PureComponent {
// 	render() {
// 		console.error('PureCompChild render....');
// 		return <div className="pure-comp-child">PureCompChild</div>;
// 	}
// }

class CompChildChild extends React.Component {
	handleClick = () => {
        const { handleChangeParentState, parentValue } = this.props;
        console.error(parentValue, 'parentValue...')
		handleChangeParentState(`${parentValue}change`);
	};
	render() {
		return <button onClick={this.handleClick}>parent state + 'change'</button>;
	}
}

class CompChild extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		console.error('CompChild render....');
		return (
			<div className="comp-child">
				<div>CompChild</div>
                <CompChildChild {...this.props} />
			</div>
		);
	}
}

class Parent extends React.Component {
	state = {
		value: 'parent',
	};

	handleChangeState = value => {
		this.setState({ value, });
	};

	render() {
		const { value } = this.state;
		return (
			<Fragment>
				<CompChild parentValue={value} handleChangeParentState={this.handleChangeState} />
				<input
					placeholder="更改父组件状态"
					value={this.state.value}
					onChange={e => this.handleChangeState(e.target.value)}
				/>
			</Fragment>
		);
	}
}

export default Parent;
