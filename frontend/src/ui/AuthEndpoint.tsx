import { endpoints } from "../../../shared";

interface AuthEndpointProps {
  type: string;
  setType: (value: string) => void;
}

export default function AuthEndpoint({ type, setType }: AuthEndpointProps) {
  return (
    <>
      {endpoints.map((endpoint) => (
        <div
          key={endpoint}
          className={
            type === endpoint ? "auth__endpoint-active" : "auth__endpoint"
          }
          onClick={() => setType(endpoint)}
        >
          {endpoint}
        </div>
      ))}
    </>
  );
}
