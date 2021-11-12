import React from 'react'
import style from './projects.module.scss'

interface Props {
    some: string
}

export default class Projects extends React.Component <Props> {

    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    render(): JSX.Element {
        return (
            <div className={style.x}>
                {this.props.some}
            </div>
        )
    }
}