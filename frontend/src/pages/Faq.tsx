import { useEffect } from "react";

export default function Faq() {
  useEffect(() => {
    const test = async () => {
      try {
        const response = await fetch("URL_DELLA_TUA_FUNZIONE?tipo=lastMatch");
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error("Errore:", error);
      }
    };

    test();
  }, []);
  return (
    <>
      <p>faq</p>
    </>
  );
}
