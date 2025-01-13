import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button className="btn">Button</button>
    </>
  );
}

export default App;
