import React, { Component } from 'react';
import './AddForm.css';

class AddForm extends Component {

render(){

    return (

  <div >
    <button onClick={this.props.togle}>Add Movie</button>
      <div className={`add-form ${this.props.visible ? '' : 'hide'}`}>
        <form  onSubmit={this.props.addMovie}>
            <input  name="movieName"  onBlur={this.props.handleInput} placeholder="Add title"required/>
              <input  name="movieYear" onBlur={this.props.handleInput} placeholder="Add year" required/>
                <input name="movieImg" onBlur={this.props.handleInput} placeholder="Add img url" required/>
                  <input className="inputSubmit" type="submit" value="Confirm"/>
                </form>
              </div>
            </div>

    );
  }
}

export default AddForm;
