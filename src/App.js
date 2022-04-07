import Home from "./Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Dashboard from "./Dashboard"
import UserDetails from "./UserDetails"
import RegisteredEvents from "./RegisteredEvents"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/sign-in" exact element={<SignIn />}></Route>
        <Route path="/sign-up" exact element={<SignUp />}></Route>
        <Route path="/dashboard" exact element={<Dashboard />}></Route>
        <Route path="/user-details" exact element={<UserDetails />}></Route>
        <Route path="/registered-events" exact element={<RegisteredEvents />}></Route>
      </Routes>
    </Router>
  )
}