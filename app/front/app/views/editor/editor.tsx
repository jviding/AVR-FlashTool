import React from 'react'
import style from './editor.module.scss'

import Console from '../console/console'

interface Props {
    filename: string
}

interface IState {
    mcuName: string,
    mcuLib: string,
    code: string
}

export default class Editor extends React.Component <Props, IState> {

    constructor(props: Props) {
        super(props)
    }

    state: IState = {
        mcuName: 'ATtiny85',
        mcuLib: 'tn85def.inc',
        code: 'main:\n; *** Write your code here ***'
    }

    getDefaultCodeLines() {
        return [
            `; *** This program is written for ${this.state.mcuName} ***`,
            '.nolist',
            `.include "${this.state.mcuLib}"`,
            '.list',
            ''
        ].map((text, index) => {
            return (
                <div key={index} className={style.line}>{text}</div>
            )
        })
    }

    getRowNumbers() {
        const rowCount = this.getDefaultCodeLines().length + this.getTextAreaRowCount()
        return Array.from(Array(rowCount), (_, index) => {
            let className = style.line
            if (index === this.getDefaultCodeLines().length) {
                className = style.lineExtraPaddingTop
            }
            return (
                <div key={index} className={className}>{index+1}</div>
            )
        })
    }

    getTextAreaRowCount() {
        const count = this.state.code.split('\n').length
        return count > 10 ? count : 10
    }

    render(): JSX.Element {
        return (
            <div className={style.container}>
                <div>
                    <div className={style.row}>
                        <div className={style.cell}>
                            <h1>Editor</h1>
                        </div>
                        <div className={style.cellExpanded}></div>
                        <div className={style.cell}>
                            <h3 className={style.nowrap}>Target MCU:</h3>
                        </div>
                        <div className={style.cell}>
                            <select>
                                <option value="at85def.asm" selected>ATtiny85</option>
                                <option value="asd2">asd1234</option>
                                <option value="asd2">asd12345</option>
                            </select>
                        </div>
                        <div className={style.cell}>
                            <button>Build</button>
                        </div>
                        <div className={style.cell}>
                            <button>Flash</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={style.row}>
                        <div className={`${style.cell} ${style.numbering}`}>
                            {this.getRowNumbers()}
                        </div>
                        <div className={style.cellExpanded}>
                            {this.getDefaultCodeLines()}
                            <textarea
                                rows={this.getTextAreaRowCount()}
                                value={this.state.code}
                                onChange={(event) => this.setState({ code: event.target.value })}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <Console some={'asd'} />
            </div>
        )
    }
}