import React, { useState } from 'react';
const COUNT_INCREMENT = 1;
const COUNT_METHOD_ENUM = {plus : 1, minus : -1};

const Clicker = () => {
    const [count, setCount] = useState(0);
    const [increment, setCountIncrement] = useState(COUNT_INCREMENT);
    const [countMethod, setCountMethod] = useState(COUNT_METHOD_ENUM.minus);

    const incrementHandler 
        = () => setCount((count) => count + increment * countMethod); 
    const incrementValueHandler 
        = (e) => setCountIncrement(isNaN(+e.target.value) ? increment : +e.target.value);
    const selectOptionHandler
        = (e) => setCountMethod(+e.target.value);

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
        </div>
    );
}

export default Clicker;
