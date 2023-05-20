import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import previous from "../public/images/icons8-back-to-40.png";
import "./App.css";
import next from "../public/images/icons8-next-page-40.png";
import { entireMonth } from "./utils/getMonth";
import { Modal } from "bootstrap";
import { useState, useEffect } from "react";
import MonthlyView from "./components/MonthlyView";
import WeeklyView from "./components/WeeklyView";

function App() {
  const [view, setView] = useState("monthly");

  useEffect(() => {}, [view]);

  return (
    <>
      {view === "monthly" ? <MonthlyView /> : <WeeklyView />}

      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <select
            className="form-select"
            name="view"
            id="v_select"
            onChange={() => {
              setView(document.getElementById("v_select").value);
            }}
          >
            <option value="monthly" selected>
              Monthly View
            </option>
            <option value="weekly">Weekly View </option>
          </select>
        </div>
        <div className="col-4"></div>
      </div>
    </>
  );
}

export default App;
