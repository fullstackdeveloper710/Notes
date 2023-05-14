import "./App.css";
import Notes from "./containers/Notes";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NotesList from "./containers/NotesList";
import NoteDetail from "./containers/NoteDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="layout">
        <Routes>
          <Route path="/" index element={<Notes />} />
          <Route path="/notes-list" element={<NotesList />} />
          <Route path="/node-detail/:id" element={<NoteDetail/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
