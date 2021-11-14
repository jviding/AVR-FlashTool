import React from 'react'
import style from './console.module.scss'

interface LogEvent {
    time: string,
    event: string
}

interface Props {
    logs: LogEvent[]
}

export default class Console extends React.Component <Props> {

    constructor(props: Props) {
        super(props)
    }

    getLogs() {
        return this.props.logs.map((logEvent, index) => {
            return (
                <div key={index} className={style.line}>
                    <div className={style.time}>
                        [{logEvent.time}]:
                    </div>
                    <div className={style.message}>
                        {logEvent.event}
                    </div>
                </div>
            )
        })
    }

    componentDidUpdate() {
        const CONSOLE = document.getElementById('console') as HTMLElement
        CONSOLE.scrollTop = CONSOLE.scrollHeight
    }

    render(): JSX.Element {
        return (
            <div>
                <h3>Console</h3>
                <div className={style.container} id="console">
                    {this.getLogs()}
                </div>
            </div>
        )
    }
}