import { useState } from 'react'

export default function Counter() {
    const [count, setCounter] = useState(0);

    function increment() {
        setCounter(count + 1);
    }

    function decrement() {
        setCounter(count - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}
