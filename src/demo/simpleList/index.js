import * as React from 'react';
import VirtualList from '../../lib/virtualList';

const { CommonList } = VirtualList;

const arr = [];

for (let i = 0; i < 2000; i++) {
    arr.push({
        key: `${i}`,
        value: `我是第${i + 1}个`,
    });
}

const props = {
    dataSource: arr,
    rowHeight: 20,
    width: 200,
    height: 200,
};

const warpStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
}

export default class VList extends React.Component {
	state = {
	    isVirtual: true,
	};

	getColumns = () => {};

	toggleVirtual = () => {
	    this.setState({
	        isVirtual: !this.state.isVirtual,
	    });
	};

	render() {
	    const { isVirtual } = this.state;
	    const UsedComp = isVirtual ? VirtualList : CommonList;
	    return (
            <div
                style={{ margin: '100px 0px 0px 100px' }}
            >
            <UsedComp {...props} />
            <div>{`使用${isVirtual ? 'VirtualList' : 'CommonList'}`}</div>
            <button onClick={this.toggleVirtual}>切换</button>
	        </div>
	    );
	}
}
