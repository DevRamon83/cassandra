import { useEffect } from "react";
import getPredictions from "../../api/handlers/getPredictions";

export default function UserDashboard({ username }: { username: string }) {
  useEffect(() => {
    const controller = new AbortController();

    const predictions = async () => {
      const resp = await getPredictions(controller.signal);
      if (resp.error) {
        // error handler
      }

      console.log("predictions ", resp);
    };

    predictions();
    return () => controller.abort();
  }, []);
  return (
    <>
      <h1>Hi {username}</h1>
    </>
  );
}
