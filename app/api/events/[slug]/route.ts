import { NextRequest, NextResponse } from 'next/server';
// Update the import path below to the correct location of your Event model
// Update the import path below to the correct location of your Event model
import { Event, IEvent } from '@/models';
import connectDB from '@/lib/mongodb';
type RouteParms = {
params : Promise<{slug : string}>
}

export async function GET(req : NextRequest ,{params} : RouteParms){

try{
   await connectDB();

   const {slug} = await params;

   if(!slug || typeof slug !== 'string'||slug.trim() === ''){
    return NextResponse.json({messsage : 'Invalid or missing slug parameter'}, {status : 404});
   }

   const sanitizedSlug = slug.trim().toLowerCase();

   const event : IEvent | null = await Event.findOne({slug : sanitizedSlug});

   if(!event){
      return NextResponse.json({message : 'Event not found'}, {status : 404});
   }
   return NextResponse.json({message : 'Event found sucessfully',event}, {status : 200});

}catch(e){

   if(process.env.NODE_ENV === 'development'){
      console.error('Error fetching event by slug:', e);
   }

}

}