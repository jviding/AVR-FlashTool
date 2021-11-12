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
                <div className={style.banner}>
                    <h1>Projects</h1>
                    <div>Create new</div>
                    <h2>Or choose existing</h2>
                    <div>Enter name(.asm), choose mcu</div>
                </div>
            </div>
        )
    }
}