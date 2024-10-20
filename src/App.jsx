import React, { useState, useEffect } from "react";

const App = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [shakeCount, setShakeCount] = useState(0);

  // Move handleMotionEvent outside of useEffect to reuse it
  const handleMotionEvent = (event) => {
    const { x, y, z } = event.acceleration;
    if (x !== null && y !== null && z !== null) {  // Ensure x, y, z are not null
      setAcceleration({ x, y, z });

      if (Math.abs(x) > 15 || Math.abs(y) > 15 || Math.abs(z) > 15) {
        setShakeCount((prevCount) => prevCount + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("devicemotion", handleMotionEvent);

    return () => {
      window.removeEventListener("devicemotion", handleMotionEvent);
    };
  }, []);

  const requestPermission = async () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission === "granted") {
        window.addEventListener("devicemotion", handleMotionEvent);
      }
    } else {
      window.addEventListener("devicemotion", handleMotionEvent);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Device Motion Data</h1>
      <p>Shake Count: {shakeCount}</p>
      <button onClick={requestPermission}>Enable Motion</button>
    </div>
  );
};

export default App;
