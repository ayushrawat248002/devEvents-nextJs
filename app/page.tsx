import { Suspense } from "react";
// ...existing code...
import EventsList from "@/components/Eventslist";

export default function Page() {
  return (
    <section>
      <h1>All Events</h1>

      <Suspense fallback={<div>Loading events...</div>}>
        <EventsList />
      </Suspense>
    </section>
  );
}