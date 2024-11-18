import { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyTable = () => {
    const [rates, setRates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_CURRENCY_API_URL, {
            params: {
                apikey: process.env.REACT_APP_CURRENCY_API_KEY,
                symbols: 'CAD,IDR,JPY,CHF,EUR,GBP'
            }
        })
        .then(res => {
            setRates(res.data.rates);
            setError(null);
        })
        .catch(() => {
            setError('Your API key is invalid. Please check your API key.');
        });
    }, []);

    const calculate = (rate) => {
        const weBuy = (rate * 0.95).toFixed(4);
        const exchange = (rate * 1).toFixed(4);
        const weSell = (rate * 1.05).toFixed(4);
        return { weBuy, exchange, weSell };
    };

    const exampleCurrency = [
        { currency: 'CAD', weBuy: '1.3130', exchange: '1.2504', weSell: '1.1909' },
        { currency: 'EUR', weBuy: '0.9272', exchange: '0.8830', weSell: '0.8410' },
        { currency: 'IDR', weBuy: '15076.6350', exchange: '14358.7000', weSell: '13674.9524' },
        { currency: 'JPY', weBuy: '120.3479', exchange: '114.6170', weSell: '109.1590' },
        { currency: 'CHF', weBuy: '0.9633', exchange: '0.9174', weSell: '0.8738' },
        { currency: 'GBP', weBuy: '0.7723', exchange: '0.7354', weSell: '0.7005' }
    ];

    return (
        <div className='container'>
            <h1 className='text-center'>Currency Exchange Rates</h1>
            <p className='text-muted text-center'>
                This table showing the current exchange rates for currencies such as CAD, IDR, JPY, CHF, and EUR based on USD, along with the comparison of We Buy and We Sell prices.
            </p>

            {!error && (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>We Buy</th>
                            <th>Exchange Rate (USD)</th>
                            <th>We Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(rates).map((currency) => {
                            const rate = rates[currency];
                            const { weBuy, exchange, weSell } = calculate(rate);
                            return (
                                <tr key={currency}>
                                    <td>{currency}</td>
                                    <td>{weBuy}</td>
                                    <td>{exchange}</td>
                                    <td>{weSell}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {error && (
                <>
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                    <h3 className="text-center mt-4">Example Exchange Rates</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Currency</th>
                                <th>We Buy</th>
                                <th>Exchange Rate (USD)</th>
                                <th>We Sell</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exampleCurrency.map((data) => (
                                <tr key={data.currency}>
                                    <td>{data.currency}</td>
                                    <td>{data.weBuy}</td>
                                    <td>{data.exchange}</td>
                                    <td>{data.weSell}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default CurrencyTable;
