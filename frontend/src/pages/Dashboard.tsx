import { useContext } from "react";
import UserDashboard from "../components/dashboard/UserDashboard";
import { AuthContext } from "../context";

export default function Dashboard() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {auth?.username ? (
        <UserDashboard username={auth?.username} />
      ) : (
        <div>You must be logged in</div>
      )}
    </>
  );
}
