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
            <div className={style.container}>
                <h1>Projects</h1>
                <div>Current project: XXX</div>
                <h3>New project</h3>
                <div>Create!</div>
                <h3>Open project</h3>
                <div>Enter name(.asm), choose mcu</div>
            </div>
        )
    }
}