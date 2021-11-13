import React from 'react'
import style from './navbar.module.scss'

interface Props {
    viewActive: string,
    setView(newView: string): void,
    allowEditor: boolean
}

interface IState {
    views: string[]
}

export default class NavBar extends React.Component <Props, IState> {

    constructor(props: Props) {
        super(props)
    }

    state: IState = {
        views: ['Projects']
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.allowEditor === false && this.props.allowEditor) {
            this.setState({ views: this.state.views.concat(['Editor']) })
        }
    }

    getNavBarOptions() {
        return this.state.views.map((view, index) => {
            return (
                <div
                    key={index}
                    className={this.props.viewActive === view ? `${style.cell} ${style.active}` : style.cell}
                    onClick={() => this.props.setView(view)}>
                    {view}
                </div>
            )
        })
    }

    render(): JSX.Element {
        return (
            <div className={style.navbar}>
                {this.getNavBarOptions()}
                <div className={style.extendedCell}></div>
            </div>
        )
    }
}