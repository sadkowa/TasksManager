import React from 'react';
import TasksApi from './TasksAPI';

class TasksManager extends React.Component {
    state = {
        task: '',
        tasks: [],
    }

    constructor() {
        super()
        this.tasksApi = new TasksApi()
    }

    componentDidMount() {
        this.tasksApi.load()
            .then(data => {
                data.forEach(this.addTaskToState.bind(this))
            })
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log(tasks)
    }

    inputHandler = e => {
        this.setState({ task: e.target.value })
    }

    formHandler = e => {
        e.preventDefault()

        const { task } = this.state

        if (!task) return prompt('Pole "Nazwa zadania" nie może być puste')

        const newItem = this.createNewTaskObj(task)

        this.tasksApi.add(newItem)
            .then(this.addTaskToState.bind(this))
    }

    createNewTaskObj(task) {
        return {
            name: task,
            time: 0,
            isRunning: false,
            isDone: false,
            isRemoved: false,
            order: 0
        }
    }

    addTaskToState(item) {
        this.setState(state => {
            return {
                tasks: [...state.tasks, item],
            }
        })
    }

    toggleTimer = ({ isRunning, id }) => {
        !isRunning ? this.startCount(id) : this.stopCount(id)
    }


    startCount(id) {
        this.idInterval = setInterval(() => {
            const task = this.state.tasks.find(t => t.id === id);

            if (task) {
                const newTask = {
                    ...task,
                    time: task.time + 1,
                    isRunning: true,
                }

                this.tasksApi.update(newTask, id)
                    .finally(() => {
                        this.setState(state => {
                            const newTasks = state.tasks.map(task => {
                                if (task.id === id) {
                                    return newTask
                                }
                                return task
                            })
                            return { tasks: newTasks }
                        })
                    })
            }
        }, 1000)
    }

    stopCount(id) {
        clearInterval(this.idInterval)

        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if (task.id === id) {
                    const newItem = {
                        ...task,
                        isRunning: false,
                    }
                    this.tasksApi.update(newItem, id)
                    return newItem
                } return task
            })
            return { tasks: newTasks }
        })
    }

    timerButtonDisabled({ isDone, isRunning }) {
        const isRunningTask = this.state.tasks.filter(task => task.isRunning)
        if (isRunningTask.length === 0) {
            if (isDone) {
                return true
            }
            return false
        }
        if (isRunningTask.length !== 0) {
            if (!isRunning) {
                return true
            } else {
                return false
            }
        }
        if (isDone) {
            return true
        }
    }

    getButtonText(task) {
        if (task.isRunning) return 'stop'
        else return 'start'
    }

    createTimer(counter) {
        let hours = Math.floor((counter % (60 * 60 * 24)) / (60 * 60));
        let minutes = Math.floor((counter % (60 * 60)) / (60));
        let seconds = Math.floor((counter % 60));

        hours < 10 ? hours = '0' + hours : hours
        minutes < 10 ? minutes = '0' + minutes : minutes
        seconds < 10 ? seconds = '0' + seconds : seconds

        return `${hours}:${minutes}:${seconds}`
    }

    markDone = id => {
        clearInterval(this.idInterval)

        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if (task.id === id) {
                    const newItem = {
                        ...task,
                        isRunning: false,
                        isDone: true,
                        order: Date.now()
                    }
                    this.tasksApi.update(newItem, id)
                    return newItem
                } return task
            })
            newTasks.sort((a, b) => {
                const orderA = Number(a.isDone) + '.' + a.order
                const orderB = Number(b.isDone) + '.' + b.order
                return orderA - orderB
            })

            return { tasks: newTasks }
        })
    }

    removeButtonHandler = (id) => {
        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if (task.id === id) {
                    const newItem = {
                        ...task,
                        isRemoved: true
                    }
                    this.tasksApi.update(task, id)
                    return newItem
                }
                return task
            })
            return { tasks: newTasks }
        })
    }

    render() {
        const { tasks } = this.state
        const tasksSections = tasks.map(task => {
            const { name, time, isDone, id } = task

            const timerButtonDisabled = this.timerButtonDisabled(task);
            if (task.isRemoved) return null

            return (
                <section id={id} className='main__section section'>
                    <header className='section__header'>
                        <h3 className='section__name'>{name}</h3>
                        <h3 className='section__timer'>{this.createTimer(time)}</h3>
                    </header>
                    <footer className='section__footer'>
                        <button
                            className={timerButtonDisabled ? 'section__button button button--disabled' : 'section__button button'}
                            disabled={timerButtonDisabled}
                            onClick={() => this.toggleTimer(task)}>
                            {this.getButtonText(task)}
                        </button>
                        <button
                            className={`section__button button ${isDone ? 'button--done' : ''}`}
                            onClick={() => this.markDone(id)}>
                            zakończone
                        </button>
                        <button
                            className={`section__button button ${isDone ? '' : 'button--disabled'}`}
                            disabled={!isDone}
                            onClick={() => this.removeButtonHandler(id)}>
                            usuń
                        </button>
                    </footer>
                </section>
            )
        })
        return (
            <>
                <header className='header'>
                    <h1
                        className='header__heading'
                        onClick={this.onClick}>
                        TasksManager
                    </h1>
                </header>
                <main className='main'>
                    <form
                        className='main__form form'
                        onSubmit={this.formHandler}>
                        <input
                            className='form__input'
                            value={this.state.task}
                            onChange={this.inputHandler}
                            name="task"
                            type="text"
                            placeholder='Nazwa zadania' />
                        <input
                            className='form__button button'
                            type="submit" />
                    </form>
                    {tasksSections}
                </main>
            </>
        )
    }
}

export default TasksManager;