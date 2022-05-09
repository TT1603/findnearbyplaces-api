import { HashRouter, Routes, Route } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import FederatedLogin from "./components/FederatedLogin";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import AddPlace from "./components/AddPlace";
import EditPlace from "./components/EditPlace";
import DeletePlace from "./components/DeletePlace";
import AddReview from "./components/AddReview";
import Search from "./components/Search";
import bg2 from "./assets/bg2.jpg";
import { useState } from "react";

function App() {
  const [customerID, setID] = useState(localStorage.getItem("customerID"));
  const [customerEmail, setEmail] = useState(
    localStorage.getItem("customerEmail")
  );

  function loginHandler(id, username) {
    localStorage.setItem("customerID", id);
    localStorage.setItem("customerEmail", username);
    setID(localStorage.getItem("customerID"));
    setEmail(localStorage.getItem("customerEmail"));
  }

  function logoutHandler() {
    localStorage.removeItem("customerID");
    localStorage.removeItem("customerEmail");
    setID(localStorage.getItem("customerID"));
    setEmail(localStorage.getItem("customerEmail"));
  }

  return (
    <HashRouter>
      <Container
        fluid
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Row>
          <Col>
            <Menu
              customerID={customerID}
              customerEmail={customerEmail}
              logoutHandler={logoutHandler}
            />
          </Col>
        </Row>
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login loginHandler={loginHandler} />}
          ></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            exact
            path="/google/:username/:id"
            element={
              <FederatedLogin provider="google" loginHandler={loginHandler} />
            }
          ></Route>
          <Route exact path="/search" element={<Search />}></Route>
          <Route exact path="/addplace" element={<AddPlace />}></Route>
          <Route exact path="/editplace" element={<EditPlace />}></Route>
          <Route exact path="/deleteplace" element={<DeletePlace />}></Route>
          <Route exact path="/addreview" element={<AddReview />}></Route>

          <Route exact path="/" element={<Home />}></Route>
        </Routes>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </HashRouter>
  );
}

export default App;
