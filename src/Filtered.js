import React, { Component } from 'react';
import './Filtered.css';

class Filtered extends Component {
onClick(event){
  this.props.setDeleteId();
  this.props.deleteMovie();
}
render(){
  var filterList = this.props.filtered.map((list, i) => {
    return (<li key={i} ><img src={list.img}/> {list.name}<span>{list.year}</span>
            <button className="deleteButton" onClick={(event)=>{this.props.deleteMovie(list.id,list.name);}}>Delete</button>
    </li>);
  });

    return (
        <ul>
          {filterList}
          </ul>

    );
  }
}

export default Filtered;
