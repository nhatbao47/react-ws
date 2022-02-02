import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AuthorizedRoute from "./Routes/AuthorizedRoute";
import Main from "./Main";
import Header from "./Components/Header";

class App extends Component<any, any> {
  render(): React.ReactNode {
    return (
      <React.Fragment>
        <Header />
        <h2 className="px-3 py-2">React Sprint</h2>
        <div className="container-fluid">
          <Routes>
            <Route
              path="/*"
              element={
                <AuthorizedRoute>
                  <Main />
                </AuthorizedRoute>
              }
            ></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}

export default App;