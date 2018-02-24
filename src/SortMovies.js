import React, { Component } from 'react';
import './SortMovies.css';

class SortMovies extends Component {

render(){

    return (
       <div className="row">
        <div className="col-md-12 buttons">
            <button onClick={this.props.sortByYearA}>Sort by year</button>
              <button onClick={this.props.sortByYearB}>Sort by year</button>
                <button onClick={this.props.sortAlpha}>Sort A-Z</button>
                  <button onClick={this.props.sortAlphaZ}>Sort Z-A</button>
                  </div>
                </div>

    );
  }
}

export default SortMovies;
