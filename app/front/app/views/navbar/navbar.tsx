import React from 'react'
import style from './navbar.module.scss'

interface Props {
    options: string[],
    active: string
}

export default class Test extends React.Component <Props> {

    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    render(): JSX.Element {

        const OPTIONS = this.props.options.map((option, index) => {
            let className = `${style.option}`
            if (this.props.active == option) {
                className = `${style.option}`
            }
            return (
                <div key={index} className={className}>
                    {option}
                </div>
            )
        })

        return (
            <div className={style.navbar}>
                {OPTIONS}
            </div>
        )
    }
}