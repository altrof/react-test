import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={() => 
              <DialogsContainer />} />

          <Route path="/profile/:userId?" render={() => 
              <ProfileContainer />} />
          
          <Route path="/login" render={() => 
              <Login />} />

          <Route exact path="/news" render={() =>
              <News />} />

          <Route exact path="/users" render={() => <UsersContainer />} />    
              
          <Route exact path="/music" render={() => <Music />} />
          <Route exact path="/settings" render={() => <Settings />} />
          
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
