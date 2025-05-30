import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import MealRecipePage from "./components/MealRecipePage";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <Router>
      <Analytics />
      <div className="flex flex-col">
        <Navbar />
        <Chatbot />
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
