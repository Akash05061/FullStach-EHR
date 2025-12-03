const { BrowserRouter } = ReactRouterDOM;

function App() {
  return (
    <div>
      <h1>EHR Frontend Working</h1>
      <p>This is the starting point.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
