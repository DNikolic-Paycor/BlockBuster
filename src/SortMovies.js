import React, { Component } from 'react';
import './SortMovies.css';

class SortMovies extends Component {

render(){

    return (
        <div>
            <button onClick={this.props.sortByYearA}>Sort by year</button>
              <button onClick={this.props.sortByYearB}>Sort by year1</button>
                <button onClick={this.props.sortAlpha}>Sort A-Z</button>
                  <button onClick={this.props.sortAlphaZ}>Sort Z-A</button>
                </div>

    );
  }
}

export default SortMovies;
