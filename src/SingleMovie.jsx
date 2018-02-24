import React from 'react'
import {Link} from 'react-router-dom'
import './SingleMovie.css'

class SingleMovie extends React.Component {

render(){
 

let textInput = null
let addForm=<form onSubmit={(event)=>{event.preventDefault();this.props.addDescription("kica",textInput.value);textInput.value=""}} >
              <textarea type="text" ref={(input) => {textInput = input}}/>
              <input type="submit" value="Add Rewiew"></input>
            </form>

var renderCom=this.props.comments.map((comment,i)=>{return (<li className="comments-li" key={i}><div className="row"><p className="col-md-2 user-name">{comment.user}:</p></div><div className="row"><div className="col-md-12 comments-text">{comment.text}</div></div></li>)})

return (
    <div className="row movie-box">
       <div className="col-md-4 movie">
        <h1 className="movie-header">{this.props.name}</h1>
        <img src={this.props.img} alt="Movie" className="movie-img"/>
        <Link to="/"><button className="deleteButton" onClick={()=>{this.props.deleteMovie(this.props.id,this.props.name)}}>Delete</button></Link>
        <Link to="/"><button className="deleteButton">Back to movies</button></Link> 
       </div>
      
      <div className="col-md-8">
       <div className="comments">
         <h3>Movie description:</h3>
         <ul className="comments-ul">{renderCom}</ul>
             
        </div>
              {addForm}
         
      
     </div>
     </div>
    )
   }
  }
SingleMovie.defaultProps = { comments:[] };
                             
                             
                     
export default SingleMovie

