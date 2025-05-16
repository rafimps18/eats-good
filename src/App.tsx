import MainContent from "./components/MainContent";
import MealRecipePage from "./components/MealRecipePage";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/recipe/:id" element={<MealRecipePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
