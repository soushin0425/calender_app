import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const API_KEY = import.meta.env.VITE_APP_GOOGLE_CALENDER_API_KEY;
const CALENDAR_ID = import.meta.env.VITE_APP_GOOGLE_CALENDER_ID;

interface EventItem {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

const CalendarViewer: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    const fetchEvents = async () => {
      const timeMin = `${selectedDate}T00:00:00Z`;
      const timeMax = `${selectedDate}T23:59:59Z`;

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        CALENDAR_ID
      )}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

      try {
        const res = await axios.get(url);
        setEvents(res.data.items);
      } catch (err) {
        console.error("イベント取得エラー:", err);
      }
    };

    fetchEvents();
  }, [selectedDate]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>選択日: {selectedDate}</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {events.length === 0 ? (
        <p>予定はありません。</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.summary}</strong> <br />
              {event.start.dateTime
                ? dayjs(event.start.dateTime).format("HH:mm")
                : "終日"}{" "}
              〜{" "}
              {event.end.dateTime
                ? dayjs(event.end.dateTime).format("HH:mm")
                : "終日"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarViewer;
