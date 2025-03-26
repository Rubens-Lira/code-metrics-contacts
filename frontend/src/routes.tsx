import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Header } from "./components/Layout";
import { Home, CreateContact, UpdateContact } from "./pages";

export default function AppRoutes() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path= "/" element = {< Home/>}/>
        <Route path= "/contacts/edit" element = {< UpdateContact/>}/>
        <Route path= "/contacts/create" element = {< CreateContact/>}/>
      </Routes>
    </Router>
  )
}