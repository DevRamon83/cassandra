import { useContext } from "react";
import { AuthContext } from "../App";
import UserDashboard from "../components/dashboard/UserDashboard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logged } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!logged) navigate("/auth");

  return <>{logged && <UserDashboard username={logged} />}</>;
}
