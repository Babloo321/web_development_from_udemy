import React from "react";
import Form from "./components/Form";

var userIsRegistered = true;

function App() {
  return (
    <div className="container">
      <Form condition={userIsRegistered}/>
    </div>
  );
}

export default App;
