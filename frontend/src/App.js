import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route, Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={user ? <Home /> : <Register />}/>

        {/* <Route path="/login" Component={user ? <Navigate to="/" /> : <Login />}/> */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>


        {/* <Route path="/login" Component={Login} /> */}

        <Route path="/profile/:username" Component={Profile}/>
      </Switch>
    </Router>
  );
}

export default App;