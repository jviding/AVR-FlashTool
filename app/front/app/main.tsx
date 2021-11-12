import React from 'react'
import ReactDOM from 'react-dom'
import style from "./main.module.scss"

import NavBar from "./views/navbar/navbar"
import Test from './views/home/home'

interface IState {
    views: string[],
    viewActive: string
}

class Main extends React.Component <unknown, IState> {
    
    state: IState = {
        views: ['Projects', 'Editor', 'Console'],
        viewActive: 'Projects'
    }

    render() {
        return (
            <div className={style.app}>
                <NavBar options={this.state.views} active={this.state.viewActive} />
                <div className={style.x}>Some</div>
                <Test some="World!" />
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))