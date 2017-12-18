import React, {Component} from 'react';
import AddForm from './AddForm.js';
import SortMovies from './SortMovies.js';
import Filtered from './Filtered.js';
import {Filter} from './Filter.js';
import {Heading} from './Heading.js'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      filtered: [],
      minYear: 0,
      maxYear: "",
      movieName: "",
      movieYear: "",
      movieImg: "",
      visible: false
    }

    this.sortByYear1 = this.sortByYear1.bind(this);
    this.sortAlpha = this.sortAlpha.bind(this);
    this.sortAlphaZ = this.sortAlphaZ.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.togle = this.togle.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this)
  } //end of constructor


  handleChange(event){
    this.setState({
      filtered: this.state.movies.filter(function(movie){
        return movie.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
      })
    })
  }

  handleYear(event) {
    this.setState({
      filtered: this.state.movies.filter(function(movie) {
        return movie.year.indexOf(event.target.value) > -1;
      })
    })
  }

  togle() {
    this.setState({
      visible: !this.state.visible
    })
  }

  addMovie() {
    fetch('https://baza-podataka.herokuapp.com/dodaj-film/', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        //  'mode': 'cors',
      },
      body: JSON.stringify({naziv: this.state.movieName, godina: this.state.movieYear, slika: this.state.movieImg})
    })
    alert(`Movie "${this.state.movieName.toUpperCase()}" has been updated to movie base.
          Thank you for updating!`);
        }


  deleteMovie(id,name){
    if(window.confirm(`Delete movie: "${name}" ?`)){
      fetch('https://baza-podataka.herokuapp.com/obrisi-film/' +id)
      alert("Movie  deleted");
      window.location.reload();

  }
}

  handleInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  sortByYear = () => {
    this.state.filtered.sort(function(a, b) {
      return a.year - b.year;
    });
    this.setState({filtered: this.state.filtered})
  }

  sortByYear1() {
    this.state.filtered.sort(function(a, b) {
      return b.year - a.year;
    });
    this.setState({filtered: this.state.filtered})
  }
  sortAlpha() {
    this.state.filtered.sort(function(a, b) {
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
  sortAlphaZ() {
    this.state.filtered.sort(function(a, b) {
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

  componentDidMount() {

    fetch('https://baza-podataka.herokuapp.com/filmovi/').then((result) => {
      return result.json();

    }).then((data) => {

      var years = data.map(movies => {
        var arr = [];
        arr.push(movies.godina);
        return arr;
      }) //kreira listu koja sadrzi godine

      var movie = data.map(movies => {
        return {name: movies.naziv, year: movies.godina, img: movies.slika, id: movies._id}
      });

      this.setState({
        minYear: Math.min(...years),
        maxYear: Math.max(...years)
      });
      this.setState({movies: movie});
      this.setState({filtered: movie});
    })

  } //end of componentwill mount

  render() {
    console.log(this.state.movieName,this.state.movieImg);
    return (
      <div className="App">
        <Heading/>
        <Filter  handleChange={this.handleChange}
                 minYear={this.minYear}
                 maxYear={this.maxYear}
                 handleYear={this.handleYear}/>
        <AddForm visible={this.state.visible}
                 handleInput={this.handleInput}
                 addMovie={this.addMovie}
                 togle={this.togle}/>
        <SortMovies sortByYearA={this.sortByYear}
                    sortByYearB={this.sortByYear1}
                    sortAlpha={this.sortAlpha}
                    sortAlphaZ={this.sortAlphaZ}/>
        <Filtered filtered={this.state.filtered}
                  setDeleteId={this.setDeleteId}
                  deleteMovie={this.deleteMovie}/>

      </div>
  );
  }
}

export default App;
