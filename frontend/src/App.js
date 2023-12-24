// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <ToastContainer position="bottom-left" /> */}
        <Toaster richColors position="bottom-left" />
        <NavBar />
        <Routes>
          <Route path="/cart" Component={Cart} />
          <Route path="*" Component={NotFound} />
          <Route path="/" exact Component={Home} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
