import React from 'react'
import ReactDOM from 'react-dom'
import style from "./main.module.scss"

import NavBar from './views/navbar/navbar'
import Projects from './views/projects/projects'
import Editor from './views/editor/editor'

interface IState {
    view: string,
    filename: string
}

class Main extends React.Component <unknown, IState> {
    
    state: IState = {
        view: 'Projects',
        filename: ''
    }

    setView(newView: string) {
        this.setState({ view: newView })
        console.log(newView)
    }

    setFilename(newFilename: string) {
        this.setState({ filename: newFilename, view: 'Editor' })
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
                        {this.state.view === 'Projects' && 
                            <Projects 
                                setFilename={this.setFilename.bind(this)} />
                        }
                        {this.state.view === 'Editor' && 
                            <Editor 
                                filename={this.state.filename} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))