import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOne] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <Grid>
      <Grid container sx={{color:'#1976d2'}}>
        <Typography variant="h2">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </Typography>
        <Typography variant="h2">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        </Typography>
        <Typography variant="h2">
          {("0" + ((time / 10) % 100)).slice(-2)}
        </Typography>
      </Grid>
      <Grid>
        {!timerOn && time === 0 && (
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => setTimeOne(true)}
          >
            Start
          </Button>
        )}
        {timerOn && (
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => setTimeOne(false)}
          >
            Stop
          </Button>
        )}
        {!timerOn && time !== 0 && (
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => setTimeOne(true)}
          >
            Resume
          </Button>
        )}
        {!timerOn && time > 0 && (
          <Button variant="contained" sx={{ m: 1 }} onClick={() => setTime(0)}>
            Reset
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Timer;
