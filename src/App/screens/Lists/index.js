/**
 * Created by osho on 3/21/18.
 */
import React from 'react';
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddList from './components/AddListItem';
import ListItemList from './components/ListItemList';

const Lists = ({ lists, addList }) => (
  <section className='pa3 pa5-ns'>
    <AddList onSubmit={({list}, _, {reset}) => {
      addList(list);
      reset()
    }} />
    <h1 className='f4 bold center mw6'>All Lists</h1>
    <ListItemList {...{ lists }} />
  </section>
);
export default connect(
  state => ({
    lists: getEntities('lists')(state)
  }),
  dispatch => ({
    addList: (name) => dispatch(actions.submitEntity({ name }, {type: 'lists'}))
  })
)(Lists)
