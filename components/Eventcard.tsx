import Link from "next/link";
import Image from "next/image";


interface props{
      image: string;
  title: string;
  slug: string;
  location: string;
  date: string; // e.g., "2025-11-07"
  time: string; // e.g., "09:00 AM"
}

const EventCard = ({title, image, slug ,location, date, time } : props) => {

    return(
        <Link href={'/events'} id='event-card'>
            <Image src={image} alt={title} width={410} height={300} className='poster'/>
            <p className="title">{title}</p>

            <div className="flex flex-row gap-3">
                <Image alt='location' src='/icons/pin.svg' height={14} width={14}/>
                <p>{location}</p>
           </div>
           <div className="datetime">
              <div>

                <Image src='/icons/calendar.svg' alt="date" width={14} height={14} />
                <p>{date}</p>

              </div>
            
              <div>
          
                 <Image src='/icons/clock.svg' alt="date" width={14} height={14} />
                 <p>{time}</p>

               </div>
                  
           </div>
        </Link>
    )
}

export default EventCard