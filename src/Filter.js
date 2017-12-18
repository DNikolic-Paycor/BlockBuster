import React from 'react';
import './Filter.css'
export class Filter extends React.Component{
  render(){
    return(
    <div>
      <input  type="text" placeholder="Search for movie" onChange={this.props.handleChange}/>
      <input type="number" min={this.props.minYear} max={this.props.maxYear} placeholder="Search by year" onChange={this.props.handleYear}/>
              </div>
    );
  }
}
