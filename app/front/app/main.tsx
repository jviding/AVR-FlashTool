import React from 'react'
import ReactDOM from 'react-dom'
import style from "./main.module.scss"

import NavBar from './views/navbar/navbar'
import Projects from './views/projects/projects'
import Editor from './views/editor/editor'

interface IState {
    view: string
}

class Main extends React.Component <unknown, IState> {
    
    state: IState = {
        view: 'Projects'
    }

    setView(newView: string) {
        this.setState({ view: newView })
        console.log(newView)
    }

    render() {
        return (
            <div className={style.app}>
                <div className={style.nav}>
                    <NavBar 
                        viewActive={this.state.view} 
                        setView={this.setView.bind(this)} />
                </div>
                <div className={style.view}>
                    <div className={style.container}>
                        {this.state.view === 'Projects' && <Projects some={'asd'} />}
                        {this.state.view === 'Editor' && <Editor filename={'asd'} />}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))