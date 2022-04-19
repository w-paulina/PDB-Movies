import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Notifications,NoAccess,  Home, Login, Registration, Player, Navigation, Footer,Navbar_logged, HomeNotLogged, UserPage, Favourites, Profile, EditProfile, Search} from "./components";
import RegistrationConfirmation from "./components/RegistrationConfirmation";


const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true
})

class App extends Component {

  state = {
    navbar: Navbar_logged(),
    home: <Home></Home>,
    logged: false
  }

  constructor(){
    super();
    this.loggedInUser();
}

  loggedInUser = async () => { 
    try {
    const response = await api.get('/getCurrentUser');
    if (response.status === 200) {
      this.setState({navbar: Navbar_logged(response.data.user_id), home: <Home/>,logged: true})
    }
   } catch (err) {
     console.error(err)
     this.setState({navbar: <Navigation/>, home: <HomeNotLogged/>, logged: false})
   }
}
  
  render(){
    return (
      <div className="App">
        <Router>
          {this.state.navbar}
          <Switch>
            <Route path="/registration" exact component={() => <Registration />} />
            <Route path="/login" exact component={() => <Login />} />
            <Route path="/favourities" exact component={() => {if(this.state.logged){return <Favourites />}else{return <NoAccess/>}}} />
            <Route path="/" exact component={() => this.state.home} />            
            <Route path="/editprofile" exact component={(props) => {if(this.state.logged){return <EditProfile {...props} />}else{return <NoAccess/>}}} />
            <Route path="/confirmation" exact component={() => <RegistrationConfirmation />} />
            <Route path="/myprofile" exact component={(props) => {if(this.state.logged){return <UserPage {...props} />}else{return <NoAccess/>}}} />
            <Route path="/movie/:id" exact render={(props) => {if(this.state.logged){return <Player {...props} />}else{return <NoAccess/>}} } />
            <Route path="/profile/:id" exact render={(props) => {if(this.state.logged){return <Profile {...props} /> }else{return <NoAccess/>}}} />
            <Route path="/notifications" exact render={() => {if(this.state.logged){return <Notifications />}else{return <NoAccess/>}} } />
            <Route path="/search" exact render={() => <Search />} />
            
          </Switch>
          <Footer/>
        </Router>
        
      </div>
    );
  }
}

export default App;