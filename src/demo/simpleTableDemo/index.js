/* eslint-disable */
import React from 'react'

// 
function TCell({ handleRowChange, rowKey, cellKey }) {
    function onChange(e) {
        handleRowChange(rowKey, { cellKey: e.target.value })
    }
    return <Input onChange={onChange} />
}

class TRow extends React.Component {
    shouldComponentUpdate(nextProps) {
        // some code
    }

    render() {
        return columns.map(it => <TCell {...someProps} {...someFun} />)
    }
}
/**
 * 一种场景：下一条的数据的默认值 根据上一条的数据生成
 */
class Table extends React.PureComponent {
    handleRowChange = (rowKey, partRecord) => {
        const { rowKey, dataSource = [], onChange } = this.props
        const newData = dataSource.map(it => {
            if (rowKey === it.rowKey) {
                return {
                    ...it,
                    ...partRecord,
                }
            }
            return it
        })
        onChange(newData)
    }

    render() {
        const { dataSource = [], columns = [] } = this.props
        return (
            <div className="table-warp">
                <THead />
                <div className="tbody-warp">
                    {
                        dataSource.map(data => (
                            <TRow {...someProps} {...someFun} />
                        ))
                    }
                </div>
            </div>
        )
    }
}
