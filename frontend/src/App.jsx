import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { AppRoutes } from "./router";
import ScrollToTop from "./components/base/ScrollToTop";

function App() {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          console.log(`Dark mode: ${isDark ? "enabled" : "disabled"}`);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
