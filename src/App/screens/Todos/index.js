import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredTodos: props.todos,
      status: 'All'
    };
  }
  componentWillReceiveProps(nextProps) {
    switch (this.state.status) {
      case 'All':
        this.setState({
          filteredTodos: nextProps.todos
        });
        break;
      case 'Active':
        this.setState({
          filteredTodos: nextProps.todos.filter(todo => !todo.completed)
        });
        break;
      case 'Completed':
        this.setState({
          filteredTodos: nextProps.todos.filter(todo => todo.completed)
        });
        break;
    }
  }
  render() {
    const { todos, addTodo, toggleTodo } = this.props;
    const { filteredTodos } = this.state;
    return (
      <section className='pa3 pa5-ns'>
        <AddTodo onSubmit={({todo}, _, {reset}) => {
          addTodo(todo);
          reset()
        }} />
        <div className="tc">
          <a
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                filteredTodos: todos,
                status: 'All'
              });
            }}
            className="f6 link dim ba ph3 pv2 mb2 dib black"
          >All</a>
          <a
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                filteredTodos: todos.filter(todo => !todo.completed),
                status: 'Active'
              });
            }}
            className="f6 link dim ba ph3 pv2 mb2 dib black"
          >Active</a>
          <a
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                filteredTodos: todos.filter(todo => todo.completed),
                status: 'Completed'
              });
            }}
            className="f6 link dim ba ph3 pv2 mb2 dib black"
          >Completed</a>
        </div>
        <h1 className='f4 bold center mw6'>{this.state.status} Todos</h1>

        <TodoList {...{ todos: filteredTodos, toggleTodo }} />
      </section>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array
};

export default connect(
  state => ({
    todos: getEntities('todos')(state)
  }),
  dispatch => ({
    addTodo: (text) => dispatch(actions.submitEntity({ text }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'}))
  })
)(Todos)
