"use client";
import Image from "next/image";
const ExploreBtn = () => {
  return (
    <button type='button' id="explore-btn" className="mt-7 mx-auto" onClick={() => console.log("CLICK")}>
     <a href="#events">
        Explore events
        <Image src="/icons/arrow-down.svg" alt='arrow-down' height={20} width={20} />
     </a>
    </button>
  );
};

export default ExploreBtn;
