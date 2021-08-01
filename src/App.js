import { Route, withRouter, BrowserRouter } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import Login from './components/Login/Login';
import React from 'react'
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloarder from './components/common/Preloarder/Preloarder';
import store from './redux/redux-store'
import { Suspense } from 'react';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))




class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloarder />
    }
    return (
      
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />

            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />

            <Route path="/login" render={() =>
              <Login />} />

            <Route exact path="/news" render={() =>
              <News />} />

            <Route exact path="/users" render={withSuspense(UsersContainer)} />

            <Route exact path="/music" render={() => <Music />} />
            <Route exact path="/settings" render={() => <Settings />} />

          </div>

        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))
(App);

const MainApp = (props) => {
  return <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
  <AppContainer />
  </BrowserRouter>
  </Provider>
  </React.StrictMode>
}

export default MainApp;
