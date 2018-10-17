import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SimpleList from './simpleList'

function App() {
    return <div>
        <SimpleList />
    </div>
}

ReactDOM.render(<App />, document.getElementById('app'))
