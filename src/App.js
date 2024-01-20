import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  const updateTime = useCallback(() => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const formattedMinute = m < 10 ? `0${m}` : m;
    const formattedSecond = s < 10 ? `0${s}` : s;

    setCurrentTime(`${formattedHour}:${formattedMinute}:${formattedSecond} ${ampm}`);

    if (isAlarmSet && alarmTime === `${formattedHour}:${formattedMinute} ${ampm}`) {
      alert('Alarm!');
      setIsAlarmSet(false);
    }
  }, [alarmTime, isAlarmSet]);

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [updateTime]);

  const handleSetAlarm = () => {
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const ampm = document.getElementById('ampm').value;

    if (hour === 'Hour' || minute === 'Minute' || ampm === 'AM/PM') {
      alert('Please select a valid time to set the alarm!');
      return;
    }

    const newAlarmTime = `${hour}:${minute} ${ampm}`;
    setAlarmTime(newAlarmTime);
    setIsAlarmSet(true);
  };

  return (
    <div className="wrapper">
      <h1>{currentTime}</h1>
      <div className="content">
        <div className="column">
          <select id="hour">
            <option value="Hour" selected disabled hidden>Hour</option>
            {Array.from({ length: 12 }, (_, i) => {
              const hour = i + 1 < 10 ? `${i + 1}` : `${i + 1}`;
              return <option value={hour} key={hour}>{hour}</option>;
            })}
          </select>
        </div>
        <div className="column">
          <select id="minute">
            <option value="Minute" selected disabled hidden>Minute</option>
            {Array.from({ length: 60 }, (_, i) => {
              const minute = i < 10 ? `0${i}` : `${i}`;
              return <option value={minute} key={minute}>{minute}</option>;
            })}
          </select>
        </div>
        <div className="column">
          <select id="ampm">
            <option value="AM/PM" selected disabled hidden>AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <button onClick={handleSetAlarm}>
        {isAlarmSet ? 'Clear Alarm' : 'Set Alarm'}
      </button>
    </div>
  );
};

export default AlarmClock;
