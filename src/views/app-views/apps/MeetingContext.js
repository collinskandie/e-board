// MeetingContext.js
import { createContext, useState, useEffect } from "react";
import dayjs from "dayjs";

export const MeetingContext = createContext();

const STORAGE_KEY = "meetings_data";

const initialMeetings = [
  {
    id: 1,
    title: "Q3 Board Review",
    type: "physical",
    date: dayjs().format("YYYY-MM-DD"), // normalized format
    startTime: "11:00 AM",
    endTime: "1:00 PM",
    agendas: ["Budget review", "Strategy session"],
    participants: [],
    statusColor: "cyan",
  }
];

export const MeetingProvider = ({ children }) => {
  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialMeetings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
  }, [meetings]);

  const addMeeting = (meeting) => {
    setMeetings((prev) => [...prev, { ...meeting, id: Date.now() }]);
  };

  const deleteMeeting = (id) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MeetingContext.Provider value={{ meetings, addMeeting, deleteMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
};
