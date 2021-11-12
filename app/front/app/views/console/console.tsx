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
            <div>
                <h3>Console</h3>
                <div className={style.container}>
                    <div className={style.line}>
                        <div className={style.time}>
                            123:
                        </div>
                        <div className={style.message}>
                            asdasd
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}