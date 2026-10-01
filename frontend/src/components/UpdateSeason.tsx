import update from "../api/handlers/update.ts";

export default function UpdateSeason() {
  const realData = {
    league: "serieA",
    season: "2026/2027",
  };

  const sendData = async () => {
    const resp = await update(realData);
    console.log(resp);
  };

  return (
    <>
      <p>prova</p>
      <button onClick={sendData}>Invia</button>
    </>
  );
}
