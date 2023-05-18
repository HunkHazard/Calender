import "./App.css";
import { entireMonth } from "./utils/getMonth";

function App() {
  return (
    <>
      {entireMonth(4, 2023).map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </>
  );
}

export default App;
