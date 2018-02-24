import React,{Component} from 'react';
import './Filter.css'
class Filter extends Component{
  render(){
    return(
    <div className="row">
      <input  type="text" placeholder="Search for movie" onChange={this.props.handleChange}/>
      <input type="number" min={this.props.minYear} max={this.props.maxYear} placeholder="Search by year" onChange={this.props.handleYear}/>
              </div>
    );
  }
}
export default Filter
