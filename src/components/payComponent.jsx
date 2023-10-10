import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
//  import Cards from 'react-credit-cards';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './pay.css'

// import Card from 'react-credit-cards'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utils'
// import render from 'react-dom';


const PaymentForm = () => {
  const [l,lState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    issuer: '',
    focused: '',
    formData: null
  });

  const handleInputChange = (evt) => {
    if (evt.target.name === 'number') {
      evt.target.value = formatCreditCardNumber(evt.target.value)
    } else if (evt.target.name === 'expiry') {
      evt.target.value = formatExpirationDate(evt.target.value)
    } else if (evt.target.name === 'cvc') {
      evt.target.value = formatCVC(evt.target.value)
    }

    const { name, value } = evt.target;
    lState((prev) => ({ ...prev, [name]: value }));
  }

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      lState({ issuer })
    }
  }

  const handleInputFocus = (evt) => {
    lState((prev) => ({ ...prev, focus: evt.target.cvc }));
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert('You have finished payment!')
    this.form.reset()
  }

  // render = () =>{
  //   const { name, number, expiry, cvc, focused, issuer } = l
  return (
    <div key='Payment'>
      <div className='App-payment'>
        <h1>Enter your payment details</h1>
        <h4>please input your information below</h4>
        <Cards
          number={l.number}
          expiry={l.expiry}
          cvc={l.cvc}
          name={l.name}
          focused={l.focus}
          callback={handleCallback}
        />
        <form  onSubmit={handleSubmit}>
          <div className='form-group'>
            <small>Name on card:</small>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Name'
              pattern='[a-z A-Z-]+'
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className='form-group'>
              <small>Card Number:</small>

              <input
                type='tel'
                name='number'
                className='form-control'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>

            <div className='form-group'>
              <small>Expiration Date:</small>

              <input
                type='tel'
                name='expiry'
                className='form-control'
                placeholder='Valid Thru'
                pattern='\d\d/\d\d'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className='form-group'>
              <small>CVC:</small>

              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <input type='hidden' name='issuer' value={l.issuer} />
            <div className="form-actions">
              <button type="submit">Submit</button>
            </div>
          {/* <input
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        /> */}
        </form>
      </div>
    </div>
  );
}
// }
// render(<PaymentForm />,document.getElementById('root'))
export default PaymentForm;
