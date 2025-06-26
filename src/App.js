import Star from './star.svg';
import './App.css';
import { MdOutlineStarBorder, MdStar } from 'react-icons/md';
import { useState, useEffect, useRef } from 'react';
import eggsImg from './eggs.png';
import beepSound from './beep.mp3';



function App() {

  const options = [
    { label: 'Soft-boiled', time: 300 },
    { label: 'Jammy', time: 420 },
    { label: 'Hard-boiled', time: 600 },
  ];

  const [selected, setSelected] = useState(null); // index of selected option
  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOptionClick = (index) => {
    if (selected === index) {
      // Unselect if clicked again
      setSelected(null);
      setTime(0);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    } else {
      setSelected(index);
      setTime(options[index].time);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const startCountdown = () => {
    if (isRunning || selected === null) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setSelected(null);
          playBeep();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const resetCountdown = () => {
    if (selected !== null) {
      setTime(options[selected].time);
    }
  };

  const playBeep = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();

      // Stop after 5 seconds
      setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }, 5000);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="App">
      <div className="card">
      
        <div className="level-buttons">
          {/* <button className="option"><MdOutlineStarBorder width="35" height="35" viewBox="0 0 25 19" />Soft-boiled</button>
          <button className="option"><MdOutlineStarBorder width="35" height="35" viewBox="0 0 25 19" />Jammy</button>
          <button className="option"><MdOutlineStarBorder width="35" height="35" viewBox="0 0 25 19" />Hard-boiled</button> */}
          {options.map((opt, index) => {
            const isSelected = selected === index;
            const Icon = isSelected ? MdStar : MdOutlineStarBorder;
            return (
              <button
                key={opt.label}
                className="option"
                onClick={() => handleOptionClick(index)}
              >
                <Icon width="35" height="35" viewBox="0 0 25 19" />
                {opt.label}
              </button>
            );
          })}
        </div>
        <div className="egg-image">
          {selected === null && <img src={eggsImg} alt="Egg" className="egg-photo" />}
          {selected === 0 && <div className="soft-boiled-pixel"></div>}
          {selected === 1 && <div className="jammy-pixel"></div>}
          {selected === 2 && <div className="hard-boiled-pixel"></div>}
        </div>
        <div className="separator">
        <div className="timer">
          <h1>{formatTime(time)}</h1>
          {!isRunning ? (
            <button className="start" onClick={startCountdown}>Start</button>
          ) : (
            <button className="start" onClick={resetCountdown}>Reset</button>
          )}
        </div>
          {/* Hidden audio element for beep */}
        <audio ref={audioRef} src={beepSound} preload="auto" />
        </div>
      
       
      </div>
    </div>
  );
}

export default App;
