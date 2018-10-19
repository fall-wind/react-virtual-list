import React from 'react';
import SimpleList from '../simpleList';
import ScuTest from '../scuTest';
import RenderTest from '../renderTest';

function Pagination({ totol, onChange, value }) {
    const arr = new Array(totol).fill('1');
    console.error(arr, 'arr');
    return (
        <div className="pagination-warp">
            {arr.map((it, index) => (
                <button
                    style={{
                        background: value === index + 1 ? '#F7941F' : '#fff',
                        marginRight: 10,
                        height: 30,
                        width: 30,
                    }}
                    onClick={() => {
                        onChange(index);
                    }}
                    key={index}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

export default class App extends React.Component {
    state = {
        curPage: 1,
    };

    handlePageChange = curPage => {
        this.setState({
            curPage: curPage + 1,
        });
    };

    render() {
        const { curPage } = this.state;
        return (
            <div className="app-warp">
                {curPage === 1 && <RenderTest />}
                {curPage === 2 && <ScuTest />}
                {curPage === 3 && <SimpleList />}
                <Pagination onChange={this.handlePageChange} value={curPage} totol={3} />
            </div>
        );
    }
}
