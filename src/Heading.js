import React from 'react';
import './Heading.css'
export class Heading extends React.Component{
  render(){
    return(
    <div className="row">
      <div className="col-md-2 empty"></div>
        <div className="col-md-5 div1"><h1 className="app-header">BlockBuster</h1>
          </div>
           <div className="col-md-5 div2"></div>
             </div>
    );
  }
}
