import React from 'react';
import { Route, NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const { push } = useHistory();
  // same as:
  // const history = useHistory();
  // const push = history.push;
  const item = props.items.find(
    thing => `${thing.id}` === props.match.params.id
  );

  const { id } = props.match.params;

  const handleEditClick = () => {
    push(`/item-update/${id}`);
  }

  const handleDeleteClick = () => {
    axios.delete(`http://localhost:3333/items/${id}`)
      .then(res=>{
        props.setItems(res.data);
        push('/item-list');
      })
      .catch(err=>{
        console.log(err);
      })
  }

  if (!props.items.length || !item) {
    return <h2>Loading item data...</h2>;
  }

  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${item.id}`}>
          the story
        </NavLink>
        <NavLink to={`/item-list/${item.id}/shipping`}>shipping</NavLink>
      </nav>
      <Route
        exact
        path="/item-list/:id"
        render={props => <ItemDescription {...props} item={item} />}
      />
      <Route
        path="/item-list/:id/shipping"
        render={props => <ItemShipping {...props} item={item} />}
      />
      <button onClick={handleEditClick} className="md-button">
        Edit
      </button>
      <button onClick={handleDeleteClick} className="md-button">
        Delete
      </button>
    </div>
  );
}

export default Item;
