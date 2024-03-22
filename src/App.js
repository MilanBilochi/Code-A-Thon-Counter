
import './App.css';
import TimerCard from './Components/TimerCard';
import Message from './Components/Message';
import { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import sound from './Sounds/sound.mp3'

function App() {
  const [messageText, setMessageText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState('Start Timer');
  const [dateSelected, setDateSelected] = useState(null);
  const [counterData, setCounterData] = useState({});
  const [showCounter, setShowCounter] = useState(false);
  const [isComplted, setIsCompleted] = useState(false)
  const [play] = useSound(sound);
  let timerRef = useRef(null);

  const handleChange = (event) => {
    setDateSelected(event.target.value)
    console.log(event.target.value)

  }

  const setTime = () => {
    let a = new Date();
    let delta = Math.abs(new Date(dateSelected).getTime() - a.getTime()) / 1000;
    let days = Math.floor(delta / 86400)
    delta -= Math.floor(delta / 86400) * 86400;
    let hours = Math.floor(delta / 3600) % 24
    delta -= Math.floor(delta / 3600) % 24 * 3600;
    let minutes = Math.floor(delta / 60) % 60;
    delta -= Math.floor(delta / 60) % 60 * 60;
    let seconds = Math.floor(delta % 60)
    let timerData = {
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    };
    localStorage.setItem('time' , JSON.stringify(timerData))
    setCounterData(timerData)
    if(days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      play();
      setIsRunning(false);
      setButtonText('Start Timer');
      handleCancel();
      setIsCompleted(true);
      setMessageText('The countdown is over! what\'s next in your adventure')
    }
  }


  const handleClick = (event) => {
    event.preventDefault();
    setIsCompleted(false)
    if (buttonText === 'Cancel Timer') {
      setIsRunning(!isRunning);
      !isRunning ? setButtonText('Cancel Timer') : setButtonText('Start Timer');
      handleCancel();
    } else {
    let a = new Date();
    let delta = Math.abs(new Date(dateSelected).getTime() - a.getTime()) / 1000;
    let days = Math.floor(delta / 86400)
    console.log(new Date(dateSelected) < a)
    if(days >= 100 || new Date(dateSelected) < a) {
      if(new Date(dateSelected) < a) {
        setMessageText('Selected Date should be greater than current date')
      } else {
        setMessageText('Selected time is more than 100 days')
      }
    } else {
      setIsRunning(!isRunning);
      !isRunning ? setButtonText('Cancel Timer') : setButtonText('Start Timer');
      setMessageText('')
        setShowCounter(true)
        setTime();
        const timerID = setInterval(() => {
          setTime();
        }, 1000)
        timerRef.current = timerID
        let test = localStorage.getItem('time')
        console.log(JSON.parse(test).seconds)
        return () => clearInterval(timerRef.current)
      }
    }
    
  }
  const handleCancel = () => {
    console.log('hello ??')
    setCounterData({})
    setShowCounter(false)
    clearInterval(timerRef.current);
  }
  return (
    <div className="home">
      <label className="header">Countdown <span style={{ color: '#c221bf' }}>Timer</span></label>
      <form onSubmit={handleClick}>
        <input type="datetime-local" onChange={handleChange} />
        <input type="submit" value={buttonText} />
      </form>
      {showCounter &&
        <div className='timer-box'>
          <TimerCard text="Days" value={counterData.days} />
          <TimerCard text="Hours" value={counterData.hours} />
          <TimerCard text="Minutes" value={counterData.minutes} />
          <TimerCard text="Seconds" value={counterData.seconds} />
        </div>
      }
      {
        messageText !== '' ?
          <Message text={messageText} isCompleted={isComplted}/>
          :
          <></>
      }
    </div>
  );
}

export default App;
