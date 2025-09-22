import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [time, setTime] = useState({
    days: 1,
    hours: 35,
    minutes: 56,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else if (days > 0) {
          seconds = 59;
          minutes = 59;
          hours = 23;
          days--;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => value.toString().padStart(2, '0');

  return (
    <div className="mb-12">
      <h3 className="text-lg text-muted-foreground mb-4">Limited Time Offer Ends In:</h3>
      <div className="flex justify-center space-x-4 text-center">
        <div className="bg-card rounded-lg p-4 min-w-[80px]" data-testid="countdown-days">
          <div className="text-3xl font-bold countdown-digit">{formatTime(time.days)}</div>
          <div className="text-sm text-muted-foreground">Days</div>
        </div>
        <div className="bg-card rounded-lg p-4 min-w-[80px]" data-testid="countdown-hours">
          <div className="text-3xl font-bold countdown-digit">{formatTime(time.hours)}</div>
          <div className="text-sm text-muted-foreground">Hours</div>
        </div>
        <div className="bg-card rounded-lg p-4 min-w-[80px]" data-testid="countdown-minutes">
          <div className="text-3xl font-bold countdown-digit">{formatTime(time.minutes)}</div>
          <div className="text-sm text-muted-foreground">Minutes</div>
        </div>
        <div className="bg-card rounded-lg p-4 min-w-[80px]" data-testid="countdown-seconds">
          <div className="text-3xl font-bold countdown-digit">{formatTime(time.seconds)}</div>
          <div className="text-sm text-muted-foreground">Seconds</div>
        </div>
      </div>
    </div>
  );
}
