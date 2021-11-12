import React from 'react'
import style from './editor.module.scss'

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

        const str1 = "*** This program is written for Attiny85 ***"
        const str2 = '.nolist \n.include "tn85def.inc" \n.list'
        const str3 = "main:\n*** Write your code here ***"

        return (
            <div className={style.container}>
                Target MCU:
                {str1}
                {str2}
                {str3}
            </div>
        )
    }
}