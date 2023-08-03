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
        this.tasksApi.load().then(data => {
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

        const newItem = {
            name: this.state.task,
            time: '00:00:00',
            isRunning: false,
            isDone: false,
            isRemoved: false
        }
        this.tasksApi.add(newItem)
            .then(this.addTaskToState.bind(this))
    }

    addTaskToState(item) {
        this.setState(state => {
            return {
                tasks: [...state.tasks, item],
            }
        })
    }

    countButtonHandler = e => {
        this.changeButtonDisplay(e.target)

        if (e.target.classList.contains('active')) {
            this.startCount(e)
        } else this.stopCount()

    }

    changeButtonDisplay = (el) => {
        el.textContent === 'start' ? el.textContent = 'stop' : el.textContent = "start"
        el.classList.toggle('active')
    }

    startCount = (e) => {
        let counter = 0

        this.id = setInterval(() => {
            counter++
            this.updateTasks(e, counter)

        }, 1000)


    }

    stopCount = () => {
        clearInterval(this.id)
    }

    updateTasks = (e, counter) => {
        const timer = this.createTimer(counter)
        const section = e.target.parentElement.parentElement

        const nameEl = section.querySelector('.section__name')
        const taskName = nameEl.textContent
        const timerEl = section.querySelector('.section__timer')

        const newTasks = [...this.state.tasks]
        newTasks.forEach(task => {
            if (task.name === taskName) {
                timerEl.textContent = timer

            }
        })
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

    render() {
        const { tasks } = this.state
        const tasksSections = tasks.map(task => {
            return (
                <section className='main__section section'>
                    <header className='section__header'>
                        <h3 className='section__name'>{task.name}</h3>
                        <h3 className='section__timer'>{task.time}</h3>
                    </header>
                    <footer className='section__footer'>
                        <button className='section__button button' onClick={this.countButtonHandler}>start</button>
                        <button className='section__button button'>zakończone</button>
                        <button className='section__button button button--disabled' disabled={true}>usuń</button>
                    </footer>
                </section>
            )
        })
        return (
            <>
                <header className='header'>
                    <h1 className='header__heading' onClick={this.onClick}>TasksManager</h1>
                </header>
                <main className='main'>
                    <form className='main__form form' onSubmit={this.formHandler}>
                        <input className='form__input' value={this.state.task} onChange={this.inputHandler} name="task" type="text" placeholder='Nazwa zadania' />
                        <input className='form__button button' type="submit" />
                    </form>
                    {tasksSections}
                </main>
            </>
        )
    }
}

export default TasksManager;