import { useState } from "react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [category, setCategory] = useState<string | null>("inicio");

  return (
    <div className="App">
      <Header category={category} onSelect={setCategory} />
      <MainContent category={category} onSelect={setCategory} />
      <Sidebar />
    </div>
  );
}

export default App;
