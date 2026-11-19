import { useContext } from "react";
import { AuthContext } from "../App";
import UserDashboard from "../components/dashboard/UserDashboard";

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
