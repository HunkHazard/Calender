import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import previous from "../public/images/icons8-back-to-40.png";
import next from "../public/images/icons8-next-page-40.png";
import { entireMonth } from "./utils/getMonth";

function App() {
  const week_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="container">
      <h1>Event Calender</h1>
      <div className="row">
        <div className="col-7">
          <div className="row justify-content-end ">
            <div className="col-4">
              <select id="month" className="form-select">
                <option defaultValue>Choose...</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4" selected>
                  May
                </option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>
            <div className="col-2">
              <h3> 2023</h3>
            </div>
          </div>
        </div>
        <div className="col-5">
          <button style={{ border: "none" }}>
            <img src={previous} alt="previous btn" />
          </button>
          <button style={{ border: "none" }}>
            <img src={next} alt="next btn" />
          </button>
        </div>
      </div>

      <div className="row">
        <table className="table">
          <thead>
            <tr>
              {week_days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entireMonth(4, 2023).map((week, index) => (
              <tr key={index}>
                {week.map((date_obj, index) => (
                  <td
                    key={index}
                    className={
                      date_obj.status === true ? "current" : "not-current"
                    }
                  >
                    {date_obj.date}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
