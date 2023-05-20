import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../App.css";
import previous from "/images/icons8-back-to-40.png";
import next from "/images/icons8-next-page-40.png";
import { entireMonth } from "../utils/getMonth";
import { Modal } from "bootstrap";
import { useState, useEffect } from "react";

function MonthlyView() {
  const [clickedDate, setClickedDate] = useState("");
  const [month_calender, setMonthCalender] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [events, setEvents] = useState([]);

  // update the calender when the month or year changes
  // (whenever these states are changed)
  useEffect(() => {
    const month_calender = entireMonth(month, year);
    setMonthCalender(month_calender);

    // get the events for the current month
    fetch(`http://localhost:3000/events/${month}/${year}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [month, year]);

  // load the calender when the month changes
  function loadCal() {
    const newMonth = document.getElementById("month").value;
    setMonth(parseInt(newMonth));
  }

  // open the modal and set the clicked date
  // other modals are opened depending on the button clicked in this modal
  function openModal(date) {
    setClickedDate(date);

    // create a new modal instance and open it
    const myModal = new Modal(document.getElementById("optionModal"));
    myModal.show();
  }

  // get the events for the clicked date
  function listEvents() {
    console.log("list events");
    const myModal = new Modal(document.getElementById("listEventModal"));
    myModal.show();
  }

  // open the modal to create an event
  function createEvent(e) {
    // e.preventDefault();
    console.log("create event");
    const title = document.getElementById("eventTitle").value;
    const description = document.getElementById("eventDescription").value;
    const date = clickedDate;
    const month = parseInt(document.getElementById("month").value);

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
        console.log("Success: ", data);

        // clear the form and close the modal for next use
        document.getElementById("eventTitle").value = "";
        document.getElementById("eventDescription").value = "";
        const myModal = Modal.getInstance(
          document.getElementById("createEventModal")
        );
        myModal.hide();
        loadCal();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    alert("Event Created Successfully");
  }

  function openCreateModal() {
    const myModal = new Modal(document.getElementById("createEventModal"));
    myModal.show();
  }

  const week_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
              <div className="heading" id="year">
                {year}
              </div>
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
      <div className="container mt-5 border">
        <div className="row ">
          {week_days.map((day) => (
            <div key={day} className="col border">
              <h5>{day}</h5>
            </div>
          ))}
        </div>
        {month_calender.map((week, index) => (
          <div key={index} className="row  ">
            {week.map((date_obj, index) => (
              <div
                key={index}
                className={`col ${
                  date_obj.status === true ? "current" : "not_current"
                }    ${
                  // if the date is today, add the today class (same date, month and year)
                  date_obj.date === new Date().getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear()
                    ? " today "
                    : " border "
                } ${
                  events.some(
                    (event) =>
                      event.date === date_obj.date &&
                      event.month === month &&
                      event.year === year &&
                      date_obj.status === true
                  )
                    ? " event "
                    : ""
                } `}
                onClick={() => {
                  if (date_obj.status === true) {
                    openModal(date_obj.date);
                  }
                }}
              >
                {date_obj.date}
              </div>
            ))}
          </div>
        ))}
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
                  Do you want to list all events for {clickedDate} or create a
                  new event?
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
      {/* List event Modal */}
      <div className="modal fade" id="listEventModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>List Events</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div className="modal-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Event Title</th>
                      <th scope="col">Event Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) =>
                      event.date === clickedDate &&
                      event.month === month &&
                      event.year === year ? (
                        <tr key={index}>
                          <td>{event.title}</td>
                          <td>{event.description}</td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyView;
