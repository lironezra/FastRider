import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllRides } from '../../redux/ride/ride.actions'
import { purchaseTickets } from '../../redux/ticket/ticket.actions'
import { CONSTANT_PARAMS } from '../../utils/utils';

import InstructionsPreview from '../../components/instructions-preview/instructions-preview.component';
import FormInput from '../../components/form-input/form-input.component';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import ErrorBox from '../../components/error-box/error-box.component';

import TicketIcon from '../../assets/ico-01.png'
import ArrowIcon from '../../assets/ico-02.png'
import WatchIcon from '../../assets/ico-03.png'

import './home-page.styles.scss';

const INSTRUCTION_ITEMS = [
    { icon: TicketIcon, description: "Enter your park ticket #PIN number, then select the desired ride while nothing the stated return time"},
    { icon: ArrowIcon, description: "Press 'submit' to confirm the retrieve your access code"},
    { icon: WatchIcon, description: "When the times comes, use the special FastRider line to cut out a considerable wait time "}
];

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pinCode: '',
      error: null,
      rideId: null,
      isOutsideWorkingHours: false
    }
  }

  componentDidMount() {
    var todayHours = new Date().getHours();
    if (todayHours >= CONSTANT_PARAMS.START_WORKING_HOUR && todayHours < CONSTANT_PARAMS.END_WORKING_HOUR) {
      this.setPinIDFromLocalStorage();
    } else {
      this.setState({ isOutsideWorkingHours: true});
    }
    this.props.onFetchAllRides();
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value, error: null });
  } 

  setToLocalStorage = (pinCode) => {
    localStorage.setItem('pinid', pinCode);
  }

  setPinIDFromLocalStorage = () => {
    let pinId = localStorage.getItem('pinid');
    if (pinId) { 
      this.setState({ pinCode: pinId})
    }
  }

  pinCodeChecker = (pinCode) => {
    // regex pattern is ok
    let pinCodePatternValid = (/\b^JN-\d{4}-\d{4}-\w*[A-Z]{1}\w*[A-Z]{1}$/).test(pinCode.trim());

    if(pinCodePatternValid) {
      let pinCodeLastLetters = pinCode.split('-')[3].split('');

      //checking for first number and ASCII letter
      let firsNumberArray = pinCode.split('-')[1].split('').map(function(item) {
          return parseInt(item, 10);
      });      
  
      let secondNumberArray = pinCode.split('-')[2].split('').map(function(item) {
          return parseInt(item, 10);
      });
  
      let isFirstLetterValid = this.letterValidChecker(firsNumberArray, pinCodeLastLetters[0]); 

      if(isFirstLetterValid) {
        let isSecondLetterValid = this.letterValidChecker(secondNumberArray, pinCodeLastLetters[1]);
  
        if(isSecondLetterValid) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false
    }
  }

  letterValidChecker = (numberArray, letter) => {
    let multiplyArray = numberArray.map((number, i) => {
      if (i%2 === 0) {
        return number * 1 > 9 ? this.sumDigitNumber(number) : number * 1;
      } else {
        return number * 2 > 9 ? this.sumDigitNumber(number * 2) : number * 2;
      }
    });

    let sumArray = multiplyArray.reduce((acc, number) => acc + number);
    let asciiLetterFromSum = String.fromCharCode((sumArray % 26) + 65); 

    if(asciiLetterFromSum === letter) {
      return true;
    }

    return false;
  }

  sumDigitNumber = (number) => {
    var sum = 0;
    
    var str = number.toString();
    for(let i = 0; i <= str.length - 1; i++){
      sum += +str[i];
    }
    
    return sum;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    if(!this.props.selectedRideId) {
      this.setState({ error: 'You must select ONE ride!!!'});
      return;
    }

    if (this.state.pinCode) {
      let isPinCodeValid = this.pinCodeChecker(this.state.pinCode);
      if (isPinCodeValid) {
        this.props.onPurchaseTickets(
          {
            pin: this.state.pinCode, 
            token: '433898df4a3e992b8411004109e4d574a90695e39e',
            ride_id: this.props.selectedRideId
          }
        );
  
        this.setToLocalStorage(this.state.pinCode);
        this.props.history.push('/ordered-items');
      } else {
        this.setState({ error: 'PIN code is not valid!!!'});
        return;
      }
    } else {
      this.setState({ error: 'PIN code is Required!!!'});
      return;
    }
  }

  render() {
    let errorOutOfWork = null;
    let rides = this.props.ridesError ? 
      <ErrorBox className='error-box'>
        Error, rides ticket can't be loaded. <br />Error description: { this.props.ridesError }.<br />
        Please contact administrator!
      </ErrorBox> : <p>Loding...</p>;
    
    if (this.props.rides) {
      rides = <CollectionPreview rides={this.props.rides}/>;
    } 
    
    if (this.state.isOutsideWorkingHours) {
      errorOutOfWork = <ErrorBox>Cannot assign FastRider tickets outside of working hours (09:00 - 19:00)</ErrorBox>;
    }   

    return (
      <>
        <InstructionsPreview items={INSTRUCTION_ITEMS} />
        <form onSubmit={this.handleSubmit}>
            {this.state.error ? <ErrorBox>{this.state.error}</ErrorBox> : null}
            <FormInput                        
              handleChange={this.handleChange}
              name='pinCode'
              value={this.state.pinCode ? this.state.pinCode : ''}/>
            <CustomButton 
              type='submit'
              disabled={this.state.isOutsideWorkingHours ? true : false}
              >SUBMIT</CustomButton>
        </form>
        <div>
          {errorOutOfWork}
        </div>
        {rides}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    rides: state.ride.rides,
    loading: state.ride.loading,
    selectedRideId: state.ride.selectedRideId,
    ticket: state.ticket.tickets,
    ridesError: state.ride.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllRides: () => dispatch(fetchAllRides()) ,
    onPurchaseTickets: (apiParams, pinId) => dispatch(purchaseTickets(apiParams, pinId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);