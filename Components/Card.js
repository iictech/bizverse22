import React from 'react'
import displayRazorpay from '../Utils/payment_gateway'

function Card() {
  return (
    <div>
        <button type= 'button' onClick={displayRazorpay} className='pay-button'><h1>Pay</h1></button>
    </div>
  )
}

export default Card