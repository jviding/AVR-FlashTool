import React from 'react'
import style from './navbar.module.scss'

interface Props {
    viewActive: string,
    setView(newView: string): void
}

interface IState {
    views: string[]
}

export default class NavBar extends React.Component <Props, IState> {

    constructor(props: Props) {
        super(props)
    }

    state: IState = {
        views: ['Projects', 'Editor', 'Console']
    }

    getNavBarOptions() {
        return this.state.views.map((view, index) => {
            return (
                <div
                    key={index}
                    className={this.props.viewActive === view ? `${style.option} ${style.active}` : style.option}
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
            </div>
        )
    }
}