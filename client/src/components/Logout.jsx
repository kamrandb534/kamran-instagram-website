import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Your role is: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
