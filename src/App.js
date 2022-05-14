import './App.css';
import CurrencyInput from "./components/CurrencyInput/CurrencyInput.tsx";
import {useState, useEffect} from "react";

const axios = require("axios");

const BASE_URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'; 

function App() {

  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState('UAH');
  const [currencyTo, setCurrencyTo] = useState('USD');
  const [rates, setRates] = useState([]);

 // init currencies codes and rates get once (middle between sale and buy)
 // UAH is default
  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      setRates(response.data.reduce((next, cur) => {
        next[cur.ccy] = (+cur.sale + +cur.buy) / 2;
        return next;
      }, {'UAH': 1}));
    });
  }, []);

  const roundUp = (number) => number.toFixed(2);

  //Four inputs and some useStates to rule them all
  function handleAmountFromChange(amount) {
    setAmountTo(roundUp(amount *  rates[currencyFrom] / rates[currencyTo]));
    setAmountFrom(+amount);
  }

  function handleAmountToChange(amount) {
    setAmountFrom(roundUp(amount * rates[currencyFrom] / rates[currencyTo]));
    setAmountTo(+amount);
    
  }    

  function handleCurrencyToChange(currency) {
    setAmountFrom(roundUp(amountTo * rates[currencyFrom] / rates[currency]));
    setCurrencyTo(currency);
  }

  function handleCurrencyFromChange(currency) {
    setAmountTo(roundUp(amountFrom * rates[currencyFrom] / rates[currency]));
    setCurrencyFrom(currency);
  }  
  
  return (
    <section className="header">
    <div className="header-currency">
      <CurrencyInput
        onAmountChange={handleAmountFromChange}
        onCurrencyChange={handleCurrencyFromChange}
        currencies={Object.keys(rates)}
        amount={+amountFrom}
        currency={currencyFrom} />
      <CurrencyInput
        onAmountChange={handleAmountToChange}
        onCurrencyChange={handleCurrencyToChange}
        currencies={Object.keys(rates)}
        amount={+amountTo}
        currency={currencyTo} />
    </div>
    </section>
  );
}

export default App;
