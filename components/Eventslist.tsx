
import { IEvent } from "@/models";
import EventCard from "@/components/Eventcard";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventsList = async () => {
  const response = await fetch(`${BASE_URL}/api/events`, {
    next: { revalidate: 60 }, // cache for 1 minute
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const { events }: { events: IEvent[] } = await response.json();

  return (
    <div className="events">
      {events.map((event) => (
        <EventCard key={event._id.toString()} {...event} />
      ))}
    </div>
  );
};

export default EventsList;
