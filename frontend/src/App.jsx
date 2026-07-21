import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import CreateTicket from "./pages/CreateTicket";
import TicketList from "./pages/TicketList";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/tickets/create" />}
          />

          <Route
            path="/tickets/create"
            element={<CreateTicket />}
          />

          <Route
            path="/tickets"
            element={<TicketList />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;