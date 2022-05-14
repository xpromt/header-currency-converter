import React from 'react'
import propTypes from "prop-types"
import './CurrencyInput.css'

const CurrencyInput = (props) => {
    return (
        <div className="currency-input">
            <input className="currency-input-value" type="number" min="0" value={props.amount} onChange={event => props.onAmountChange(event.target.value)}  />
            <select className="currency-input-select" value={props.currency} onChange ={event => props.onCurrencyChange(event.target.value)}>
                {props.currencies.map((currency => (
                    <option key={currency} value={currency}>{currency}</option>
                )))}
                </select>   
        </div>
    )
}

CurrencyInput.propTypes = {
    amount: propTypes.number.isRequired,
    currency: propTypes.string.isRequired,
    currencies: propTypes.array,
    onAmountChange: propTypes.func,
    onCurrencyChange: propTypes.func
}

export default CurrencyInput