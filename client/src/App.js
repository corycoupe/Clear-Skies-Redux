import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertMsg from './components/AlertMsg';
import Header from './components/Header';
import Home from './components/Home';
import Schedule from './components/schedule/Schedule';
import ScheduleForm from './components/schedule/ScheduleForm';
import Pharma from './components/pharma/Pharma';
import PharmaForm from './components/pharma/PharmaForm';
import Therapist from './components/therapists/Therapist';
import TherapistCard from './components/therapists/TherapistCard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateMedical from './components/forms/CreateMedical';
import EditMedical from './components/forms/EditMedical';
import Dashboard from './components/Dashboard';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// useEffect is a alternative to lifecycle methods, since we are using functions not classes
// useEffect basically makes this a endless loop
// the , [] at the end makes it only run once, as if it was componentDidMount instead of endless loop
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Route exact path='/' component={Home} />
          <section className='container'>
            <AlertMsg />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/therapist' component={Therapist} />
              <Route exact path='/therapist/:id' component={TherapistCard} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-medical'
                component={CreateMedical}
              />
              <PrivateRoute
                exact
                path='/edit-medical'
                component={EditMedical}
              />
              <PrivateRoute exact path='/schedule' component={Schedule} />
              <PrivateRoute
                exact
                path='/schedule-form'
                component={ScheduleForm}
              />
              <PrivateRoute exact path='/pharma' component={Pharma} />
              <PrivateRoute exact path='/pharma-form' component={PharmaForm} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
