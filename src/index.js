import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./Pages/Home";
import Competitions from "./Pages/Competions";
import CompetitionDetails from "./Pages/CompetitionDetails";
import Layout from "./Components/Layout";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/PrivateRoutes";
import ResultsPage from "./Pages/ResultsPage";
import DespreNoi from "./Pages/DespreNoi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/despre-noi"
          element={
            <Layout>
              <DespreNoi />
            </Layout>
          }
        />{" "}
        {/* Despre Noi route */}
        <Route
          path="/competitions"
          element={
            <Layout>
              <Competitions />
            </Layout>
          }
        />
        <Route
          path="/competition/details/:id"
          element={
            <Layout>
              <CompetitionDetails />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              requiredRole="ADMIN"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/admin/result/:id_competition"
          element={
            <PrivateRoute
              requiredRole="ADMIN"
              element={
                <Layout>
                  <ResultsPage />
                </Layout>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
