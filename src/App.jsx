import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<BookList></BookList>}></Route>
        <Route path="/books" element={<BookList></BookList>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
