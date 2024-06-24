import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import Header from "./Components/Header";
import Socials from "./Components/Socials";
import Footer from "./Components/Footer";
import LandingPage from "./Pages/LandingPage";
import CoinPage from "./Pages/CoinPage";
import PageNotFound from "./Components/PageNotFound";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#4252cb" },
      secondary: { main: "#080808" },
      tertiary: { main: "#232531" },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/" Component={Landingpage} exact /> */}
            <Route
              path="/search/:searchQuery"
              element={<CoinPage type="search" />}
            />
            <Route path="/coin/:id" element={<CoinPage type="select" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Socials />
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
