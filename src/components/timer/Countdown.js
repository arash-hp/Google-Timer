import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useInterval from "../useInterval";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITIAL_COUNT = 0;
const twoDigits = (num) => String(num).padStart(2, "0");

export default function CountdownApp() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const [flag, setFlag] = useState(true);
  const [isEdit, setEdit] = useState(false);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    setStatus(STATUS.STARTED);

    if (secondsRemaining === 0) {
      setFlag(true);
      setEdit(true);
    } else {
      setFlag(false);
      setEdit(false);
    }
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
    setFlag(true);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(INITIAL_COUNT);
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );
  useEffect(() => {}, [INITIAL_COUNT, status]);

  return (
    <Grid>
      {isEdit ? (
        <Grid>
          <TextField
            sx={{ width: "50px", margin: "4px" }}
            type="text"
            placeholder={"0"}
            name="hours"
            InputProps={{ inputProps: { min: 0, max: 99 } }}
            onBlur={(e) => {
              e.target.value.length <= 2 && e.target.value >= 0
                ? setSecondsRemaining(
                    (prevSec) => +prevSec + e.target.value * 3600
                  )
                : alert("just 2 digits");
            }}
          />
          <TextField
            sx={{ width: "50px", margin: "4px" }}
            type="text"
            placeholder={"0"}
            name="minutes"
            InputProps={{ inputProps: { min: 0, max: 99 } }}
            onBlur={(e) => {
              e.target.value.length <= 2 && e.target.value >= 0
                ? setSecondsRemaining(
                    (prevSec) => +prevSec + e.target.value * 60
                  )
                : alert("just 2 digits");
            }}
          />
          <TextField
            sx={{ width: "50px", margin: "4px" }}
            type="text"
            placeholder={"0"}
            name="seconds"
            InputProps={{ inputProps: { min: 0, max: 99 } }}
            onBlur={(e) => {
              e.target.value.length <= 2 && e.target.value >= 0
                ? setSecondsRemaining((prevSec) => prevSec + +e.target.value)
                : alert("just 2 digits");
              // console.log(e.target.value.length)
            }}
          />
        </Grid>
      ) : (
        <Link
          onClick={() => {
            setFlag(true);
            setEdit(true);
            setSecondsRemaining(0);
          }}
        >
          <Typography variant="h2">
            {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
            {twoDigits(secondsToDisplay)}
          </Typography>
        </Link>
      )}
      {}
      {flag && (
        <Button variant="contained" sx={{ m: 1 }} onClick={handleStart}>
          Start
        </Button>
      )}
      {!flag && (
        <Button variant="contained" sx={{ m: 1 }} onClick={handleStop}>
          Stop
        </Button>
      )}
      {!flag && (
        <Button variant="contained" sx={{ m: 1 }} onClick={handleReset}>
          Reset
        </Button>
      )}
    </Grid>
  );
}
