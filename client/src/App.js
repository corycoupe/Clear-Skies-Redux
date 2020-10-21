import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Medication from './components/Medication';
import Therapist from './components/Therapist';
import Schedule from './components/Schedule';
import axios from 'axios';
import TherapistDetails from './components/TherapistDetails';
const apiUrl = 'http://localhost:5000/';
class App extends Component {
  state = {
    schedule: [],
    therapistList: [],
    medication: [],
    therapist: {},
  };
  componentDidMount() {
    this.getMedicationList();
    this.getTherapistList();
    this.getScheduleList();
  }

  componentDidUpdate(prevProps, prevState) {
    const idFromUrl = this.props.location.pathname.split('/')[2];
    console.log(this.props);
    if (
      prevProps.location.pathname.split('/')[2] !==
      this.props.location.pathname.split('/')[2]
    ) {
      this.getTherapistDetails(idFromUrl);
    }
  }

  getMedicationList = () => {
    axios
      .get(`${apiUrl}medical`)
      .then((response) => this.setState({ medication: response.data }))
      .catch((err) => console.log(err));
  };

  getScheduleList = () => {
    axios
      .get(`${apiUrl}schedule`)
      .then((response) => this.setState({ schedule: response.data }))
      .catch((err) => console.log(err));
  };

  getTherapistList = () => {
    axios
      .get(`${apiUrl}therapist`)
      .then((response) => this.setState({ therapistList: response.data }))
      .catch((err) => console.log(err));
  };

  getTherapistDetails = (therapistID) => {
    //Default warehouseID for componentDidMount
    if (therapistID === undefined) {
      therapistID = '1';
    }
    axios.get(`${apiUrl}therapist/${therapistID}`).then((response) => {
      console.log('this is ID for the therapistDetails Obj:', therapistID);
      this.setState({ therapist: response.data }, () =>
        console.log(this.state)
      );
    });
  };

  FormatDate = (dateTime) => {
    let dateObj = new Date(dateTime);
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const time = dateObj.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const timeAddHours = dateObj.getTime() + 2 * 60 * 60 * 1000;
    const timeConvert = new Date(timeAddHours);
    const timeEnd = timeConvert.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedDate = `${month}/${date}/${year} ${time} - ${timeEnd}`;
    return formattedDate;
  };

  SortSchedule = (schedule) => {
    const sortedSchedule = schedule.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    console.log('Sorted', sortedSchedule);
    return sortedSchedule;
  };

  render() {
    const { schedule, therapistList, medication, therapist } = this.state;

    return (
      <>
        <Header />
        {/* <Redirect from="/" to="/home" /> */}
        <Switch>
          {/* Route for inventory page */}
          <Route
            path='/home'
            render={(props) => (
              <Home
                {...props}
                schedule={schedule}
                medication={medication}
                FormatDate={this.FormatDate}
              />
            )}
            exact
          />
          <Route
            path='/medication'
            render={(props) => (
              <Medication {...props} medication={medication} />
            )}
            exact
          />
          <Route
            path='/therapist'
            render={(props) => (
              <Therapist {...props} therapistList={therapistList} />
            )}
            exact
          />
          <Route
            path='/schedule'
            render={(props) => (
              <Schedule
                {...props}
                schedule={schedule}
                FormatDate={this.FormatDate}
                SortSchedule={this.SortSchedule}
              />
            )}
            exact
          />
          <Route
            path='/therapist/:therapistid'
            render={(props) => (
              <TherapistDetails {...props} therapist={therapist} />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);

// Begin order 66
