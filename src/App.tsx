import { Routes, Route } from "react-router-dom";

// npm
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// recoil
import { RecoilRoot } from "recoil";

// pages
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </RecoilRoot>
  );
}

export default App;
