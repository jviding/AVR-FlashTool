import React from 'react'
import style from './editor.module.scss'
import API from '../../api/api'
import Console from '../console/console'
import Code from './codeHandler'

interface Props {
    filename: string
}

interface MCULib {
    mcu: string,
    lib: string
}

interface LogEvent {
    time: string,
    event: string
}

interface IState {
    mcuLibs: MCULib[],
    mcu: string,
    readOnlyCode: string,
    editableCode: string,
    error: boolean,
    errorMessage: string,
    logs: LogEvent[]
}

export default class Editor extends React.Component <Props, IState> {

    constructor(props: Props) {
        super(props)
    }

    state: IState = {
        mcuLibs: [],
        mcu: '',
        readOnlyCode: '',
        editableCode: '',
        error: false,
        errorMessage: '',
        logs: []
    }

    getTimeNow() {
        const padWithZeros = (val: number) => { return val < 10 ? '0' + val : '' + val }
        const SECONDS = padWithZeros((new Date()).getSeconds())
        const MINUTES = padWithZeros((new Date()).getMinutes())
        const HOURS = padWithZeros((new Date()).getHours())
        return `${HOURS}:${MINUTES}:${SECONDS}`
    }

    callFileAPI(fileCall: (filename: string, code: string) => Promise<string>) {
        this.setState({ error: false })
        fileCall(this.props.filename, this.state.readOnlyCode + this.state.editableCode)
        .then((logEvent) => { this.setState({ logs: this.state.logs.concat([{ time: this.getTimeNow(), event: logEvent }]) }) })
        .catch((res) => this.setState({ error: true, errorMessage: res }))
    }

    getMCULibs() {
        if (!!sessionStorage.mcuLibs) {
            return Promise.resolve(JSON.parse(sessionStorage.mcuLibs))
        } else {
            return API.getMCULibs()   
        }
    }

    getCode(filename: string) {
        if (!!sessionStorage[filename]) {
            return Promise.resolve(sessionStorage[filename])
        } else {
            return API.getFile(filename)
        }
    }

    getLogs() {
        return !!sessionStorage.logs ? JSON.parse(sessionStorage.logs) : []
    }

    setProject() {
        Promise.all([
            this.getMCULibs(),
            this.getCode(this.props.filename)
        ])
        .then(([mcuLibs, code]) => {
            const MCU_LIB = Code.getTargetOrDefaultMCULib(mcuLibs, code)
            const RO_CODE = Code.getDefaultReadOnlyCode(MCU_LIB)
            const E_CODE = Code.getActualOrDefaultEditableCode(code)
            const LOGS = this.getLogs().concat([{ time: this.getTimeNow(), event: `Started on ${this.props.filename}` }])
            this.setState({ mcuLibs: mcuLibs, mcu: MCU_LIB.mcu, readOnlyCode: RO_CODE, editableCode: E_CODE, logs: LOGS })
        })
        .catch((res) => this.setState({ error: true, errorMessage: res }))
    }

    componentDidMount() {
        this.setProject()
    }

    componentWillUnmount() {
        sessionStorage[this.props.filename] = this.state.readOnlyCode + this.state.editableCode
        sessionStorage.mcuLibs = JSON.stringify(this.state.mcuLibs)
        sessionStorage.logs = JSON.stringify(this.state.logs)
    }

    handleSelectionChange(newMCULib: MCULib) {
        const RO_CODE = Code.getDefaultReadOnlyCode(newMCULib)
        const LOGS = this.state.logs.concat([{ time: this.getTimeNow(), event: `MCU was changed to ${newMCULib.mcu} (${newMCULib.lib})` }])
        this.setState({ readOnlyCode: RO_CODE, mcu: newMCULib.mcu, logs: LOGS })
    }

    getReadOnlyCodeLines() {
        // The string ends in "\n" so slice(0, -1) is necessary
        // F.ex. "a\nb\n".split("\n") returns ["a", "b", ""]
        return this.state.readOnlyCode.split('\n').slice(0, -1).map((line, index) => {
            return <div key={index} className={style.line}>{line}</div>
        })
    }

    getRowNumbers() {
        const ROW_COUNT = this.getReadOnlyCodeLines().length + this.getTextAreaRowCount()
        return Array.from(Array(ROW_COUNT), (_, index) => {
            let className = style.line
            if (index === this.getReadOnlyCodeLines().length) {
                className = style.lineExtraPaddingTop
            }
            return (
                <div key={index} className={className}>{index + 1}</div>
            )
        })
    }

    getTextAreaRowCount() {
        const ROW_COUNT = this.state.editableCode.split('\n').length
        return ROW_COUNT > 10 ? ROW_COUNT : 10
    }

    getMCUSelectOptions() {
        return this.state.mcuLibs.map((mcuLib, index) => {
            return <option key={index} value={mcuLib.lib}>{mcuLib.mcu}</option>
        })
    }

    render(): JSX.Element {
        return (
            <div className={style.container}>
                {this.state.error && <div className={'err'}>{this.state.errorMessage}</div> }
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
                            <select 
                                defaultValue={this.state.mcu}
                                onChange={(event) => this.handleSelectionChange(this.state.mcuLibs[event.target.options.selectedIndex])} >
                                {this.getMCUSelectOptions()}
                            </select>
                        </div>
                        <div className={style.cell}>
                            <button
                                onClick={() => this.callFileAPI(API.buildFile)} >
                                Build
                            </button>
                        </div>
                        <div className={style.cell}>
                            <button
                                onClick={() => this.callFileAPI(API.flashFile)} >
                                Flash
                            </button>
                        </div>
                        <div className={style.cell}>
                            <button
                                onClick={() => this.callFileAPI(API.saveFile)} >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <h3>{this.props.filename}</h3>
                <div>
                    <div className={style.row}>
                        <div className={`${style.cell} ${style.numbering}`}>
                            {this.getRowNumbers()}
                        </div>
                        <div className={style.cellExpanded}>
                            {this.getReadOnlyCodeLines()}
                            <textarea
                                rows={this.getTextAreaRowCount()}
                                value={this.state.editableCode}
                                onChange={(event) => this.setState({ editableCode: event.target.value })}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <Console logs={this.state.logs} />
            </div>
        )
    }
}