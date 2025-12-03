// Import App component (browser-only import)
import App from "./App.js";

const { BrowserRouter } = ReactRouterDOM;

// React root render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
