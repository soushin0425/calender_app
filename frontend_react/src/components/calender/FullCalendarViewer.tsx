import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import dayjs from "dayjs"; // 追加

const API_KEY = import.meta.env.VITE_APP_GOOGLE_CALENDER_API_KEY;
const CALENDAR_ID = import.meta.env.VITE_APP_GOOGLE_CALENDER_ID;

interface GoogleEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

const FullCalendarViewer: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const timeMin = new Date().toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        CALENDAR_ID
      )}/events?key=${API_KEY}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime`;

      try {
        const res = await axios.get(url);
        const items = res.data.items.map((event: GoogleEvent) => ({
          id: event.id,
          title: event.summary,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
        }));
        setEvents(items);
      } catch (err) {
        console.error("Googleカレンダーからイベント取得失敗:", err);
      }
    };

    fetchEvents();
  }, []);

  // 今日の日付を YYYY-MM-DD で取得
  const today = dayjs().format("YYYY-MM-DD");

  // 今日のイベントだけを抽出
  const todaysEvents = events.filter(event => {
    const startDate = dayjs(event.start).format("YYYY-MM-DD");
    return startDate === today;
  });

  return (
    <div style={{ margin: "2rem" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />

      {/* ▼ 今日のイベント一覧 */}
      <div style={{ marginTop: "2rem", backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
        <h3>📅 今日のイベント</h3>
        {todaysEvents.length === 0 ? (
          <p>今日はイベントがありません。</p>
        ) : (
          <ul>
            {todaysEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong>（{dayjs(event.start).format("HH:mm")}〜{dayjs(event.end).format("HH:mm")}）
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FullCalendarViewer;
