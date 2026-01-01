import { Suspense } from "react";
// ...existing code...
import EventsList from "@/components/Eventslist";

/**
 * Renders the "All Events" page with a header and a Suspense-wrapped events list.
 *
 * @returns The root <section> element containing an <h1> and a Suspense boundary that renders `EventsList` with a "Loading events..." fallback.
 */
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