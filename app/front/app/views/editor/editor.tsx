import React from 'react'
import style from './editor.module.scss'

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
                <div key={index} className={style.codeLine}>{text}</div>
            )
        })
    }

    getRowNumbers() {
        const rowCount = this.getDefaultCodeLines().length + this.getTextAreaRowCount()
        return Array.from(Array(rowCount), (_, index) => {
            let className = style.rowNumber
            if (index === this.getDefaultCodeLines().length) {
                className = `${style.rowNumber} ${style.extraPaddingTop}`
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

                <div className={style.row}>
                    <div className={style.cell}>
                        Target MCU:
                    </div>
                    <div className={style.cell}>
                        ATtiny85 (at85def.asm)
                    </div>
                    <div className={style.expand}></div>
                    <div className={style.cell}>
                        Build
                    </div>
                    <div className={style.cell}>
                        Flash
                    </div>
                </div>
                <br/><br/>
                
                <div className={style.editor}>
                    <div className={style.leftSide}>
                        {this.getRowNumbers()}
                    </div>
                    <div className={style.rightSide}>
                        <div className={style.defaultCode}>
                            {this.getDefaultCodeLines()}
                        </div>
                        <textarea
                            rows={this.getTextAreaRowCount()}
                            value={this.state.code}
                            onChange={(event) => this.setState({ code: event.target.value })}>
                        </textarea>
                    </div>
                </div>
            </div>
        )
    }
}