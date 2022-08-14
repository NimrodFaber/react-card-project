import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Signup from "./component/Signup";
import SignUpBiz from "./component/SignUpBiz";
import Signin from "./component/Signin";
import SignOut from "./component/SignOut";
import ProtectedRoutes from "./common/ProtectedRoutes";
import CreateCard from "./component/CreateCard";
import MyCards from "./component/MyCards";
import About from "./component/About";
function App() {
  return (
    <div className="App d-flex flex-column min-vh-100 vh-100">
      <header className="container">
        <Navbar></Navbar>
      </header>

      <main className="container flex-fill mt-3 h-100">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="about" element={<About></About>} />
          <Route path="signup" element={<Signup redirect="/signin" />} />
          <Route
            path="signupbiz"
            element={<SignUpBiz redirect="/my-cards/create-card" />}
          />
          <Route path="signin" element={<Signin redirect="/" />} />
          <Route path="signout" element={<SignOut redirect="/signin" />} />
          <Route path="signout" element={<SignOut redirect="/signin" />} />
          <Route
            path="my-cards/create-card"
            element={
              <ProtectedRoutes onlyBiz>
                <CreateCard></CreateCard>
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="my-cards"
            element={
              <ProtectedRoutes onlyBiz>
                <MyCards></MyCards>
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
      </main>

      <footer className="container" style={{ backgroundColor: "#66ff4f" }}>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
