import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

const EventDetailsWrapper = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EventDetails slug={slug} />;
};

const EventDetailsPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <main>
      <Suspense fallback={<div>Loading event...</div>}>
        {/* async server component */}
        <EventDetailsWrapper params={params} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
