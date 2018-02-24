import React, {Component} from 'react'
import AddForm from './AddForm.js'
import SortMovies from './SortMovies.js'
import Filtered from './Filtered.js'
import SingleMovie from './SingleMovie'
import Filter from './Filter.js'
import {Heading} from './Heading.js'
import {Switch,Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments:[],
      movies: [],
      filtered: [],
      minYear:0,
      maxYear: "",
      movieName: "",
      movieYear: "",
      movieImg: "",
      visible: false,
      movieUrl:"",
      movieId:0
      }
    }

handleUrl=(url,id)=>{
 this.setState({movieUrl:url})
 this.setState((prevState)=>{return {movieId:prevState.movieId=id}})
}

handleChange=event=>{
    this.setState({
      filtered: this.state.movies.filter((movie)=>{
        return movie.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
      })
    })
  }

handleYear=event=> {
    this.setState({
      filtered: this.state.movies.filter((movie)=>{
        return movie.year.indexOf(event.target.value) > -1;
      })
    })
  }

togle=()=>{
    this.setState({
      visible: !this.state.visible
    })
  }
addDescription=(user,text)=>{
  let obj=this.state.comments
  let key=this.state.movieId
  let comment={user,text}

    if (obj.hasOwnProperty(key)) {
        obj[key].push(comment);
    } else {
        obj[key] = [comment];
    }

  this.setState({comments:this.state.comments})
  }

addMovie=()=>{
    fetch('https://baza-podataka.herokuapp.com/dodaj-film/', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({naziv: this.state.movieName, godina: this.state.movieYear, slika: this.state.movieImg})
    })
    alert(`Movie "${this.state.movieName.toUpperCase()}" has been updated to movie base.
          Thank you for updating!`);
  }

addComment=()=>{
    fetch('https://baza-podataka.herokuapp.com/dodaj-film/', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({naziv:"ali",godina:"2001", slika:"https://upload.wikimedia.org/wikipedia/en/3/3d/Ali_movie_poster.jpg", comments:[{user:"dragan",comment:"Work"}]})
    }).catch(error => console.error(error))
  }


deleteMovie=(id,name)=>{
  if(window.confirm(`Delete movie: "${name}" ?`)){
    fetch('https://baza-podataka.herokuapp.com/obrisi-film/' +id)
    alert("Movie  deleted")
    window.location.reload()
    }
     
  }

handleInput=(event)=> {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  this.setState({[name]: value});
}

sortByYear = () => {
  this.state.filtered.sort((a, b)=> {
  return a.year - b.year;
    });
  this.setState({filtered: this.state.filtered})
  }

sortByYear1=()=> {
  this.state.filtered.sort((a, b)=>{
    return b.year - a.year;
      });
    this.setState({filtered: this.state.filtered})
  }
sortAlpha=()=> {
    this.state.filtered.sort((a, b)=> {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y)
        return -1;
      if (x > y)
        return 1;
      return 0;
    })
    this.setState({filtered: this.state.filtered})
  }
  sortAlphaZ=()=> {
    this.state.filtered.sort((a, b)=> {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (y < x)
        return -1;
      if (y > x)
        return 1;
      return 0;
    })

    this.setState({filtered: this.state.filtered})
  }

componentDidMount(){
  fetch('https://baza-podataka.herokuapp.com/filmovi/').then((result) => {
      return result.json();
      }).then((data) => {

      var years = data.map(movies => {
        var arr = [];
        arr.push(movies.godina);
        return arr;
      }) //kreira listu koja sadrzi godine

      var movie = data.map((movies,index) => {
        return {name: movies.naziv, year: movies.godina, img: movies.slika, id: movies._id, comments:movies.comments}
      })
      

      this.setState({
        minYear: Math.min(...years),
        maxYear: Math.max(...years)
      })
      
      this.setState({movies: movie});
      this.setState({filtered: movie});
    })

  } //end of componentwill mount

  
  render() {
    return (
      <div className="container app">
        
        <Heading/>
        <Filter  handleChange={this.handleChange}
                 minYear={this.state.minYear}
                 maxYear={this.state.maxYear}
                 handleYear={this.handleYear}/>
        <SortMovies sortByYearA={this.sortByYear}
                    sortByYearB={this.sortByYear1}
                    sortAlpha={this.sortAlpha}
                    sortAlphaZ={this.sortAlphaZ}/>
        <AddForm visible={this.state.visible}
                 handleInput={this.handleInput}
                 addMovie={this.addMovie}
                 togle={this.togle}/>
        
        <Switch>
        <Route exact path="/" render={()=>
        <Filtered filtered={this.state.filtered}
                  handleUrl={this.handleUrl}/>}/>
         
        <Route path={`/${this.state.movieUrl}`} render={(props)=>
        <SingleMovie {...this.state.movies[this.state.movieId]}
                  addComment={this.addComment}
                  commentId={this.state.movieId}
                  addDescription={this.addDescription}
                  deleteMovie={this.deleteMovie}
                  comments={this.state.comments[this.state.movieId]}
                  />}/>
        </Switch>
          
        </div>
    )
  }
}

export default App;
