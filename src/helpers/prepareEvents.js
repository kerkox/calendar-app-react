import moment from "moment";
export const prepareEvents = (events) => {
  return events.map(event => prepareEvent(event))
}

export const prepareEvent = (event) => {
  return {
    ...event,
    end: moment(event.end).toDate(),
    start: moment(event.start).toDate(),
  };
}