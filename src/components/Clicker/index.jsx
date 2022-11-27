import React, { useState, useEffect } from 'react';
const COUNT_INCREMENT = 1;
const COUNT_METHOD_ENUM = {plus : 1, minus : -1};
const TIME_INTERVAL = 100;

const Clicker = () => {
    const [count, setCount] = useState(0);
    const [increment, setCountIncrement] = useState(COUNT_INCREMENT);
    const [countMethod, setCountMethod] = useState(COUNT_METHOD_ENUM.plus);
    const [timerId, setTimerId] = useState(null);
    const [interval, setCountInterval] = useState(TIME_INTERVAL);

    const incrementHandler 
        = () => setCount((count) => count + increment * countMethod); 
    const incrementValueHandler 
        = (e) => setCountIncrement((increment) => isNaN(+e.target.value) ? increment : +e.target.value);
    const selectOptionHandler
        = (e) => setCountMethod(+e.target.value);
    const autoClickHandler = () => {
        //if (!timerId) {
            const timerId = setTimeout(incrementHandler, interval);
            setTimerId(timerId);
        //};
    };
    const intervalValueHandler 
        = (e) => setCountInterval((interval) => isNaN(+e.target.value) ? interval : +e.target.value);
    
    
    useEffect(() => {
        //console.log('useEffect 1')
        autoClickHandler();
        return () => {
            clearInterval(timerId);
            setTimerId(null);
        };
    }, []);
    useEffect(() => {
        //console.log('useEffect 2', interval);
        clearInterval(timerId);
        autoClickHandler();
    }, [count, increment, countMethod, interval]);
    
    const MethodSelectOptions = Object.entries(COUNT_METHOD_ENUM)
        .map( elem => {
            const [key, value] = elem;
            return <option value={value} key={key}>{key}</option>;
        });

    return (
        <div>
            <p>{`Clicks = ${count}`}</p>
            <button onClick={incrementHandler}>{`Add ${increment * countMethod} click`}</button>
            <div>
                <label>Increment value
                    <input type="text" onChange={incrementValueHandler} value={increment}/>
                </label> 
            </div>
            <div>
                <label>Increment method
                    <select value={countMethod} onChange={selectOptionHandler}>
                        {MethodSelectOptions}
                    </select>
                </label> 
            </div>
            <button onClick={autoClickHandler}>Auto-click</button>
            <div>
                <label>Interval value
                    <input type="text" onChange={intervalValueHandler} value={interval}/>
                </label> 
            </div>
        </div>
    );
}

export default Clicker;
