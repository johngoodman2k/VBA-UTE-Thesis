import "./App.css";

// import { HeroBlock } from "./components/HeroBlock";
// import { NewsContainer } from "./components/News/NewsContainer";
import { RelatedNews } from "./components/NewsDetail/RelatedNews";
import { Slider1 } from "./components/Slider/Slider1";
import { Slider2 } from "./components/Slider/Slider2";
import { FixturesPage } from "./pages/FixturesPage";

import { LandingPageScroll } from "./pages/LandingPageScroll";
import { MatchDetailPage } from "./pages/MatchDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModalAddPlayerToTeam from "./components/Modal/ModalAddPlayerToTeam";

// import { News } from "./components/News/NewsBlock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="fixtures/match/:id" element={<MatchDetailPage />} />
        <Route path="/fixtures" element={<FixturesPage />} />
        <Route path="/" element={<ModalAddPlayerToTeam />} />
        <Route path="/home" element={<LandingPageScroll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
