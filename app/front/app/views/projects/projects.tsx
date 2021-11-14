import React from 'react'
import style from './projects.module.scss'
import API from '../../api/api'
import { isValidFilename } from './fileValidator'

interface Props {
    filename: string,
    setFilename(filename: string): void
}

interface IState {
    filenames: string[],
    newFilename: string,
    isDeleting: boolean,
    delFile: string,
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
        isDeleting: false,
        delFile: '',
        error: false,
        errorMessage: ''
    }

    loadFilenames() {
        API.getFilenames()
        .then((filenames) => this.setState({ filenames: filenames }))
        .catch((res) => this.setState({ error: true, errorMessage: res }))
    }

    createFile() {
        this.setState({ error: false })
        isValidFilename(this.state.newFilename, this.state.filenames)
        .then((newFilename) => {
            API.createFile(newFilename, 'asm')
            .then((filename) => this.props.setFilename(filename))
            .catch((res) => this.setState({ error: true, errorMessage: res }))
        })
        .catch((res) => this.setState({ error: true, errorMessage: res }))
    }

    openFile(filename: string) {
        this.props.setFilename(filename)
    }

    deleteFile(filename: string) {
        this.setState({ error: false })
        API.deleteFile(filename)
        .then(() => this.loadFilenames())
        .catch((res) => this.setState({ error: true, errorMessage: res }))
    }

    componentDidMount() {
        this.loadFilenames()
    }

    getFilenames() {
        return this.state.filenames.map((filename, index) => {
            const IS_BEING_DELETED = this.state.isDeleting && this.state.delFile === filename
            return (
                <tr key={index}>
                    <td className={style.rightAlignText}>{index + 1}.</td>
                    {!IS_BEING_DELETED && <td>{filename}</td>}
                    {IS_BEING_DELETED && <td>Are you sure?</td>}
                    <td>
                        {!IS_BEING_DELETED &&
                            <button
                                onClick={() => this.openFile(filename)}>
                                Open
                            </button>
                        }
                        {IS_BEING_DELETED &&
                            <button
                                onClick={() => this.deleteFile(filename)}>
                                Yes
                            </button>
                        }
                    </td>
                    <td>
                        {!IS_BEING_DELETED &&
                            <button
                                onClick={() => this.setState({ isDeleting: true, delFile: filename })}>
                                Delete
                            </button>
                        }
                        {IS_BEING_DELETED &&
                            <button
                                onClick={() => this.setState({ isDeleting: false, delFile: '' })}>
                                No
                            </button>
                        }
                    </td>
                </tr>
            )
        })
    }

    render(): JSX.Element {
        return (
            <div className={style.container}>
                {this.state.error && <div className={'err'}>{this.state.errorMessage}</div> }

                <h1>Projects</h1>
                <div>Current: <b>{this.props.filename || 'Not selected'}</b></div>

                <div className={style.tables}>
                    <table className={style.firstTable}>
                        <thead>
                            <tr>
                                <th colSpan={3}>New Project</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type={'text'}
                                        placeholder={'Enter filename...'}
                                        value={this.state.newFilename}
                                        onChange={(event) => this.setState({ newFilename: event.target.value })} />
                                </td>
                                <td>.asm</td>
                                <td>
                                    <button
                                        onClick={() => this.createFile()}>
                                        Create
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={style.secondTable}>
                        <thead>
                            <tr>
                                <th colSpan={4}>Open project</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getFilenames()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}