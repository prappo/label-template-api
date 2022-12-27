import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const timeout = setTimeout(() => {
     
      window.location.replace('https://labelbaker.com/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <>Will redirect in 3 seconds...</>;
}
