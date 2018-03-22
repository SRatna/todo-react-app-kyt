import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
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
    const updateFilteredTodos = {
      All: () => {
        this.setState({
          filteredTodos: nextProps.todos
        });
      },
      Active: () => {
        this.setState({
          filteredTodos: nextProps.todos.filter(todo => !todo.completed)
        });
      },
      Completed: () => {
        this.setState({
          filteredTodos: nextProps.todos.filter(todo => todo.completed)
        });
      }
    };
    updateFilteredTodos[this.state.status]();
  }
  render() {
    const { todos, addTodo, toggleTodo, lists } = this.props;
    const listID = this.props.params.listID;
    const list = lists.find(list => list.id === listID);
    const listName = list ? list.name : '';
    const filteredTodos = this.state.filteredTodos
      .filter(todo => todo.listID === listID);
    return (
      <section className='pa3 pa5-ns'>
        <div className="tc">
          <Link to="/" className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center br2 pa1 ba border-box mb2 ml4">
            <svg className="w1" viewBox="0 0 32 32" style={{ fill: 'currentcolor'}}>
              <title>chevronLeft icon</title>
              <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z" />
            </svg>
            <span className="pl1">Back</span>
          </Link>
        </div>
        <AddTodo onSubmit={({todo}, _, {reset}) => {
          addTodo(todo, listID);
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
        <h1 className='f4 bold center mw6'>
          {this.state.status}{' '}
          Todos{' '}
          [List: {listName}]
        </h1>

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
    todos: getEntities('todos')(state),
    lists: getEntities('lists')(state)
  }),
  dispatch => ({
    addTodo: (text, listID) => dispatch(actions.submitEntity({ text, listID }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'}))
  })
)(Todos)
