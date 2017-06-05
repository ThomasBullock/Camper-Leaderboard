import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';



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
      sortByName: false,
      sortByNumber: false
    }
  }

  componentDidMount() {
    // Make a request for a user with a given ID
    const self = this; 
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(function (response) {
        console.log(response);
        self.setState({
          mounted: true,
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
        console.log(response);
        self.setState({
          leaderboard: response.data,
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
      console.log(this.state.leaderboard[a]);

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
      } else if(this.state.sortByName) {
        
      } else {
        console.log('no sorting!')
        return 0;            
      }
    })
    .map( (key, index) => {
      return(
      <tr key={key}>
        <td>{index + 1}</td>
        <td>{this.state.leaderboard[key].username}</td>
        <td>{this.state.leaderboard[key].recent}</td>
        <td>{this.state.leaderboard[key].alltime}</td>
      </tr>
      )
    })
  }

  sortDataByNumber() {
    this.setState({
      sortByNumber: true,
      sortByName: false
    })
  }

  sortDataByName() {
    this.setState({
      sortByNumber: false,      
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
              <caption>Leaderboard</caption>
              <thead>
                <tr>
                  <th><button onClick={this.sortDataByNumber}>#</button></th>
                  <th><button onClick={this.sortDataByName}>Camper Name</button></th>
                  <th><button onClick={() => this.getRemoteData('recent')}>Points in past 30 days</button></th> 
                  <th><button onClick={() => this.getRemoteData('alltime')}>All time points</button></th>    
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