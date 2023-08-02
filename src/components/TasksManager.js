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
            data.forEach(this.createTaskObj.bind(this))
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

        const newItem = { name: this.state.task }
        this.tasksApi.add(newItem)
            .then(this.createTaskObj.bind(this))
    }

    createTaskObj({ name, id }) {
        const newTask = {
            name,
            id,
            time: '00:00:00',
            isRunning: false,
            isDone: false,
            isRemoved: false
        }

        this.addTask(newTask)
    }

    addTask(item) {
        this.setState(state => {
            return {
                tasks: [...state.tasks, item],
            }})
    }

    render() {
        const { tasks } = this.state
        const tasksSections = tasks.map(task => {
            return (
                <section className='main__section section'>
                    <header className='section__header'>{task.name}, {task.time}</header>
                    <footer className='section__footer'>
                        <button className='section__button button'>start/stop</button>
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