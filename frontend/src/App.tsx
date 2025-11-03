
import {Route, Routes} from "react-router-dom";
import {CalendarView} from "./pages/CalendarView";
import {AddEventPage} from "./pages/AddEvent";
import EventDetailsPage from "./pages/EventDetails";

function App() {
  return (
      <Routes>
          <Route path="/" element={<CalendarView />} />
          <Route path="/events/new" element={<AddEventPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
      </Routes>
  );
}

export default App;
