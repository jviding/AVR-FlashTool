import React from 'react'
import style from './console.module.scss'

interface Props {
    some: string
}

export default class Console extends React.Component <Props> {

    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    render(): JSX.Element {
        return (
            <div className={style.container}>
                <div>Outputs from device...</div>
            </div>
        )
    }
}