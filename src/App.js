import {useState, useEffect} from 'react';

import './App.css'

const App = () => {
    const [data, setData] = useState([])
    const [init, setInit] = useState('')
    const [results, setResults] = useState(0)

    useEffect(() => {
        fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json")
        .then((res) => res.json())
        .then((data) => updateState(data))
        .catch(() => errorMasage())
    }, [])
    
    const errorMasage = () => {
      <div className="counter">
        Что-то пошло не так...
      </div>
    }
    const updateState = (data) => {
        setData(data)
       
    }
    const convertTo = (type) => {
        const change = data.filter(item => item.cc === type);
        const rate = change.map(item => item.rate);
        const numbersRate = rate.map(Number);
        const result = (init / numbersRate).toFixed(2);
        setResults(result)
    }

    console.log('testing git');

  
    return (
      <div className="app-convert">
          <input type='number'
                className='convert-input'
                placeholder='введите значение в гривнах'
                value={init}
                onChange={(e) => setInit(e.target.value)}/>
        <div className="counter">{results}</div>
        <div className="controls">
          <button onClick={() => convertTo("USD")}>USD</button>
          <button onClick={() => convertTo("EUR")}>EUR</button>
          <button onClick={() => convertTo("PLN")}>PLN</button>
          <button onClick={() => convertTo("RUB")}>RUB</button>
        </div>
      </div>
  )
    
}

export default App;

