import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import MealRecipePage from "./components/MealRecipePage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/recipe/:id" element={<MealRecipePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
