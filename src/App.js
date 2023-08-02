import {BrowserRouter, Route} from "react-router-dom";
import LayoutPage from "./pages/layout/layout";
import HomePage from "./pages/home/home";
import AboutPage from "./pages/about/about";
import ContactsPage from "./pages/contacts/contacts";
import {Navigate, Routes} from "react-router";

function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutPage />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contacts" element={<ContactsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;