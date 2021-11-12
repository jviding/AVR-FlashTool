import React from 'react'
import style from './home.module.scss'

interface TestProps {
    some: string
}

export default class Test extends React.Component <TestProps> {

    constructor(props: TestProps) {
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