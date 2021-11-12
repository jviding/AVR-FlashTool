import React from 'react'
import style from "./editor.module.scss"

interface Props {
    filename: string
}

interface IState {
    some: string
}

export default class Editor extends React.Component <Props, IState> {

    constructor(props: Props) {
        super(props)
    }

    state: IState = {
        some: 'string'
    }

    render(): JSX.Element {
        return (
            <div className={style.navbar}>
                asd
            </div>
        )
    }
}