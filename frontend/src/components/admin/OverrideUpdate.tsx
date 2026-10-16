import { useState } from "react";
import { errors } from "../../../../shared";
import override from "../../api/handlers/override";
import type { OverrideUI } from "../../typings/interfaces";
import { useOverride } from "../../hooks/useOverride";

export default function OverrideUpdate({
  league,
  season,
  myLeague,
}: OverrideUI) {
  const [open, setOpen] = useState<boolean>(false);
  const [btn, setBtn] = useState("send");
  const [error, setError] = useState<null | string>(null);
  const { json, setJson } = useOverride(myLeague);

  const sender = async () => {
    if (btn !== "send" || !json) return;
    setBtn("wait");
    const myJson = JSON.parse(json);
    const data = { league, season, matchday: myJson };

    const resp = await override(data);
    if (resp.error)
      return setError(resp.errorMessage || errors.invalidStandard);

    setBtn("success");
  };

  return (
    <>
      <button onClick={() => setOpen(!open)}>override</button>
      {json && open && (
        <>
          <textarea
            rows={5}
            cols={40}
            onChange={(e) => setJson(e.target.value)}
            value={json}
          />
          <button onClick={sender}>{btn}</button>
        </>
      )}
      {error}
    </>
  );
}
