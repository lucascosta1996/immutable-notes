import React from "react";

export const Clock = React.memo(function Clock() {
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return <tspan dy="1.2em">{new Date(now).toLocaleTimeString()}</tspan>;
});