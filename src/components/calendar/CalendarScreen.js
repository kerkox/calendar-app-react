import React from "react";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  eventStartAddNew,
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { useSelector } from "react-redux";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { useEffect } from "react";

moment.locale("es");
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch])

  const onDoubleClick = (e) => {
    console.log("Abrir MODAL", e);
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    console.log(e)
    dispatch( eventClearActiveEvent())
    const userActionsCalendar = ['doubleClick', 'select']
    if(userActionsCalendar.includes(e.action)) {
      const newEvent = {
        title: "Nuevo Evento",
        notes: "",
        start: e.start,
        end: e.end,
        id: new Date().getTime(),
        user: {
          _id: "123",
          name: "Paul",
        },
      };
      dispatch(eventStartAddNew(newEvent));
    }
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const style = {
      backgroundColor: (uid === event.user._id ) ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };
  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={ onSelectSlot }
        selectable={true}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      {activeEvent && <DeleteEventFab />}

      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
