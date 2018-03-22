import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

const ListItem = ({id, name, isLast }) => {
  const listItemClass = classNames(
    'ph3 pv3 pointer bg-animate hover-bg-light-gray',
    {
      'bb b--light-silver': !isLast
    }
  )

  return (
    <Link to={`/todos/${id}`} className="link dim black">
      <li className={listItemClass}>
        {name}
      </li>
    </Link>
  )
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool
}

export default ListItem
