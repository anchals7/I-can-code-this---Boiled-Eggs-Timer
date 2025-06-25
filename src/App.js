import Star from './star.svg';
import './App.css';
import { MdOutlineStarBorder } from 'react-icons/md';


function App() {
  return (
    <div className="App">
      <div className="card">
      
        <div className="level-buttons">
          <button className="option"><MdOutlineStarBorder width="35" height="35" viewBox="0 0 25 19" />Soft-boiled</button>
          <button className="option"><MdOutlineStarBorder width="35" height="35" viewBox="0 0 25 19" />Jammy</button>
          <button className="option"><MdOutlineStarBorder width="35" height="35" viewBox="0 0 25 19" />Hard-boiled</button>
        </div>
        <div className="egg-image">
          <div className="pixelart-to-css">
          </div>
        </div>
        <div className="timer">
          <h1>00:00</h1>
          <button className="start">Start</button>
        </div>
       
      </div>
    </div>
  );
}

export default App;
