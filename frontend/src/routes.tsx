import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Header } from "./components/Layout";
import { Home } from "./pages";

export default function AppRoutes() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path= "/" element = {< Home/>}/>
      </Routes>
    </Router>
  )
}