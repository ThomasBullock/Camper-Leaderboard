import React, { Component } from 'react';
import axios from 'axios';
import ImageLoader from 'react-imageloader';

import './Main.css';

import Button from './Button';
import Preloader from './Preloader';


class Main extends Component {
  constructor(props) {
    super(props)

    this.getRemoteData = this.getRemoteData.bind(this);
    this.createLeaderboardList = this.createLeaderboardList.bind(this);
    this.sortDataByName = this.sortDataByName.bind(this);
    this.sortDataByNumber = this.sortDataByNumber.bind(this);    

    this.state = {
      mounted: false,
      leaderboard: null,
      recent: false,
      alltime: false, 
      sortByName: false
    }
  }

  componentDidMount() {
    // Make a request for a user with a given ID
    const self = this; 
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(function (response) {
        self.setState({
          mounted: true,
          recent: true,
          leaderboard: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
    });
  } 

  getRemoteData(choice) {
    const self = this; 
    axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/${choice}`)
      .then(function (response) {
        // console.log(response);
        const flip = (choice === 'recent') ? 'alltime' : 'recent';

        self.setState({
          leaderboard: response.data,
          [choice]: true,
          [flip]: false,
          sortByName: false,
          sortByNumber: false
        })
      })
      .catch(function (error) {
        console.log(error);
    });  
  }

  createLeaderboardList() {

    return Object.keys(this.state.leaderboard)
    .sort( (a, b) => {
      if(this.state.sortByName) {
        console.log('sorting');
        var nameA = this.state.leaderboard[a].username.toLowerCase();
        var nameB = this.state.leaderboard[b].username.toLowerCase(); 
        if(nameA < nameB) {
          return -1;
        }
        if(nameA > nameB) {
          return 1;
        }        
      } else if(this.state.recent) {
        return (this.state.leaderboard[a].recent > this.state.leaderboard[b].recent) ? -1 : 1;
      } else if(this.state.alltime) {
        return (this.state.leaderboard[a].alltime > this.state.leaderboard[b].alltime) ? -1 : 1;
      } else {
        console.log('no sorting!')
        return 0;            
      }
    })
    .map( (key, index) => {
      return(
      <tr key={key}>
        <td>{index + 1}</td>
        <td className="table__user">
            <ImageLoader
              src={this.state.leaderboard[key].img}
              wrapper={React.DOM.div}
              preloader={Preloader}>
              Image load failed!
            </ImageLoader>
            <span>
              <a href={`https://www.freecodecamp.com/${this.state.leaderboard[key].username}`}>{this.state.leaderboard[key].username}</a>
            </span>
        </td>
        <td>{this.state.leaderboard[key].recent}</td>
        <td>{this.state.leaderboard[key].alltime}</td>
      </tr>
      )
    })
  }

  sortDataByNumber() {
    this.setState({
      sortByName: false,
      leaderboard: this.state.leaderboard.reverse()
    })
  }

  sortDataByName() {
    this.setState({    
      sortByName: true
    })
  }

	render() {
    var leaderboardList;
    if(this.state.mounted) {
      leaderboardList = this.createLeaderboardList();
    } 
		return(
      <main >
        <div className="container">
            <table className="table">
              <caption><h1>CAMPER LEADERBOARD</h1></caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th><Button active={this.state.sortByName} clickFunc={this.sortDataByName} label="Sort by Name"></Button></th>
                  <th><Button active={this.state.recent} label="Pts in past 30 days" clickFunc={() => this.getRemoteData('recent')}></Button></th> 
                  <th><Button active={this.state.alltime} label="Pts All time" clickFunc={() => this.getRemoteData('alltime')}></Button></th>    
                </tr>
              </thead>
              <tbody>
                {leaderboardList}
              </tbody>      
            </table>  
          </div>
          

      </main>
		)
	}
}

export default Main;