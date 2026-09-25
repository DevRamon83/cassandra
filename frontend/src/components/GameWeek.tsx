import seasonSeed from "../api/handlers/seasonSeed.ts";

export default function GameWeek() {
  const realData = {
    league: "serieA",
    season: "2026/2027",
    game_week: 1,
  };

  const sendData = async () => {
    const update = await seasonSeed(realData);
    console.log(update);
  };

  return (
    <>
      <p>prova</p>
      <button onClick={sendData}>Invia</button>
    </>
  );
}
