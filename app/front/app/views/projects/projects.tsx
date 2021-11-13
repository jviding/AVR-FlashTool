import React from 'react'
import style from './projects.module.scss'
import API from '../../api/api'
import { isValidFilename } from './fileValidator'

interface Props {
    setFilename(filename: string): void
}

interface IState {
    filenames: string[],
    newFilename: string,
    error: boolean,
    errorMessage: string
}

export default class Projects extends React.Component <Props, IState> {

    constructor(props: Props) {
        super(props)
    }

    state: IState = {
        filenames: [],
        newFilename: '',
        error: false,
        errorMessage: ''
    }

    createFile() {
        this.setState({ error: false })
        isValidFilename(this.state.newFilename)
        .then((newFilename) => {
            API.createFile(newFilename)
            .then((filename) => this.props.setFilename(filename))
            .catch((res) => this.setState({ error: true, errorMessage: res }))
        })
        .catch((res) => this.setState({ error: true, errorMessage: res }))
    }

    componentDidMount() {
        API.getFilenames()
        .then((filenames) => this.setState({ filenames: filenames }))
        .catch((res) => this.setState({ error: true, errorMessage: res }))
    }

    getFilenames() {
        return this.state.filenames.map((filename, index) => {
            return (
                <div key={index} className={style.row}>
                    <div className={style.cell}>
                        {filename}
                    </div>
                    <div className={style.cellExtended}></div>
                    <div className={style.cell}>
                        <button>Open</button>
                    </div>
                    <div className={style.cell}>
                        <button>Delete</button>
                    </div>
                </div>
            )
        })
    }

    render(): JSX.Element {
        return (
            <div className={style.container}>
                {this.state.error && <div className={style.err}>{this.state.errorMessage}</div> }

                <h1>Projects</h1>
                <div>Current project: XXX</div>

                <div className={style.row}>
                    <div className={style.cell}>
                        <h3 className={style.nowrap}>Open project</h3>
                    </div>
                    <div className={style.cellExtended}></div>
                    <div className={style.cell}></div>
                </div>
                
                <div className={style.row}>
                    <div className={style.cell}>
                        <input
                            type={'text'}
                            placeholder={'New project'}
                            value={this.state.newFilename}
                            onChange={(event) => this.setState({ newFilename: event.target.value })} />
                            .asm
                    </div>
                    <div className={style.cellExtended}></div>
                    <div className={style.cell}>
                        <button
                            onClick={() => this.createFile()}>
                            Create
                        </button>
                    </div>
                </div>

                {this.getFilenames()}
                
            </div>
        )
    }
}