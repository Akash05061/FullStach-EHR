import App from "./App.js";

const { BrowserRouter } = ReactRouterDOM;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

