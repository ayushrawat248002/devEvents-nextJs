import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/Eventcard";
import events from "@/lib/constant";
const Home = async() => {

console.log('hi')
  return(
   <section>
    <h1 className="text-center">The Hub for Every Dev <br/> Event You Can't Miss</h1>
   
    <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
   
    <ExploreBtn/>

    <div className="space-y-7 mt-20">

      <h3>feature Events</h3>

      <ul className="events">
        {events.map((event)=>(
          <li key={event.title}> <EventCard {...event} /></li>
        ))}
      </ul>
      
    </div> 
   </section>
  )

}
export default Home;