import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import previous from "../public/images/icons8-back-to-40.png";
import "./App.css";
import next from "../public/images/icons8-next-page-40.png";
import { entireMonth } from "./utils/getMonth";
import { Modal } from "bootstrap";
import { useState, useEffect } from "react";

function App() {
  const [clickedDate, setClickedDate] = useState("");
  const [month_calender, setMonthCalender] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const month_calender = entireMonth(month, year);
    setMonthCalender(month_calender);
  }, [month, year]);

  function loadCal() {
    const newMonth = document.getElementById("month").value;
    setMonth(parseInt(newMonth));
  }

  function openModal(date) {
    setClickedDate(date);

    // create a new modal instance and open it
    const myModal = new Modal(document.getElementById("optionModal"));
    myModal.show();
  }

  function listEvents() {
    console.log("list events");
  }
  function createEvent(e) {
    e.preventDefault();
    console.log("create event");
    const title = document.getElementById("eventTitle").value;
    const description = document.getElementById("eventDescription").value;
    const date = clickedDate;
    const month = document.getElementById("month").value;
    const year = 2023;

    const event = {
      title,
      description,
      date,
      month,
      year,
    };

    console.log(event);

    fetch("http://localhost:3000/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function openCreateModal() {
    const myModal = new Modal(document.getElementById("createEventModal"));
    myModal.show();
  }

  const week_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // const months = [
  //   "January",
  //   "Febuary",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  return (
    <div className="container">
      <h1>Event Calender</h1>
      <div className="row">
        <div className="col-7">
          <div className="row justify-content-end ">
            <div className="col-4">
              <select
                id="month"
                className="form-select"
                onChange={loadCal}
                defaultValue={month}
              >
                <option value="0">January</option>
                <option value="1">Febuary</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
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
              <h3 id="year"> {year}</h3>
            </div>
          </div>
        </div>
        <div className="col-5">
          <button style={{ border: "none" }}>
            <img
              src={previous}
              alt="previous btn"
              onClick={() => {
                setYear(year - 1);
                loadCal();
              }}
            />
          </button>
          <button style={{ border: "none" }}>
            <img
              src={next}
              alt="next btn"
              onClick={() => {
                setYear(year + 1);
                loadCal();
              }}
            />
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
            {month_calender.map((week, index) => (
              <tr key={index}>
                {week.map((date_obj, index) => (
                  <td
                    key={index}
                    className={
                      date_obj.status === true ? "current" : "not_current"
                    }
                    onClick={() => {
                      if (date_obj.status === true) {
                        openModal(date_obj.date);
                      } else {
                        null;
                      }
                    }}
                  >
                    {date_obj.date}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 
      bootstrap generic modal is being used here
      with some customizations for different modals
      */}
      <div className="modal fade" id="optionModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Select an action</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Do you want to list all events for {clickedDate} or create a new
                event?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={listEvents}
              >
                List Events
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={openCreateModal}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Create event Modal */}
      <div className="modal fade" id="createEventModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Event</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="eventTitle" className="form-label">
                      Event Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventTitle"
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventDescription" className="form-label">
                      Event Description
                    </label>
                    <textarea
                      className="form-control"
                      id="eventDescription"
                      rows="3"
                      placeholder="Enter event description"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={createEvent}
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default App;
