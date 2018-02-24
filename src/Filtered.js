import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Filtered.css'

class Filtered extends Component {

render(){
  var filterList = this.props.filtered.map((list, i) =>{
    return (<Link to={`/${list.name}`} key={i} className="link">
              <li className="movies-li" onClick={()=>this.props.handleUrl(list.name,i)} ><img className="list-img" src={list.img} alt={list.name}/>{list.name}<span>{list.year}</span></li>
             </Link>
  )
})
return (
  <ul className="movies-ul">
    {filterList}
  </ul>
    );
  }
}

export default Filtered
