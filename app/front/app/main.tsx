import React from 'react'
import ReactDOM from 'react-dom'
import style from "./main.module.scss"

import NavBar from "./views/navbar/navbar"
import Editor from "./views/editor/editor"

interface IState {
    view: string
}

class Main extends React.Component <unknown, IState> {
    
    state: IState = {
        view: 'Editor'
    }

    setView(newView: string) {
        this.setState({ view: newView })
        console.log(newView)
    }

    render() {
        return (
            <div className={style.app}>
                <NavBar viewActive={this.state.view} setView={this.setView.bind(this)} />
                {this.state.view === 'Editor' && <Editor filename={'asd'} />}
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))