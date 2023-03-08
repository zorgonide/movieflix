import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainComponent from "./Components/MainComponent/MainComponent";
import { UserProvider } from "./Shared/js/user-context";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserProvider>
          <MainComponent />
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
