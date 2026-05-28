import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import ScrollToTop from "./components/base/ScrollToTop";

function App() {
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
