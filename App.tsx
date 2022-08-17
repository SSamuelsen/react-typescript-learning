import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import './style.css';

export default function App() {
  const [trigger, setTrigger] = useState(1);
  const [count, setCount] = useState(4);
  //const [runOnce, setRunOnce] = useState(() => {console.log("called once on initial component render");})
  //const [runEvery, setRunEvery] = useState(console.log("running"));

  useEffect(() => {
    // executes everytime our application renders
    console.log('useEffect Called!');
  });

  // if we only want a useEffect to render when a specific resource changes, use this
  useEffect(() => {
    console.log('useEffect called when trigger changed!');
  }, [trigger]);

  // create a hook that gets fired only on component mount by passing in an empty array
  useEffect(() => {
    console.log('on Mount');
  }, []);

  // refs examples
  // refs do not re-render the component when changed
  // most commonly used to reference dom elements
  // never use refs to modify dom values. We should only be using State to manage this
  const renderCount = useRef(0);
  const inputRef = useRef();
  const [name, setName] = useState('');

  function focus() {
    // ref has the actual DOM node of the input node, just like any js selector would have, so we can call focus
    console.log(inputRef.current);
    inputRef.current.focus();
  }

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  function decrementCount() {
    setCount((prevCount) => prevCount - 1);
  }

  function incrementCount() {
    setCount((prevCount) => prevCount + 1);
  }

  function increaseTrigger() {
    setTrigger((prev) => prev + 1);
  }

  return (
    <div>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>
      <button onClick={increaseTrigger}>+</button>
      <br />
      <div> I Rendered {renderCount.current} times </div>
      <br />
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>{name}</div>
      <button onClick={focus}>Focus</button>
    </div>
  );
}
