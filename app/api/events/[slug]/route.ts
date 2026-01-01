import { NextRequest, NextResponse } from 'next/server';
// Update the import path below to the correct location of your Event model
// Update the import path below to the correct location of your Event model
import { Event, IEvent } from '@/models';
import connectDB from '@/lib/mongodb';
type RouteParms = {
params : Promise<{slug : string}>
}

/**
 * Retrieve an Event by its slug from the database and return a JSON HTTP response.
 *
 * @param params - An object whose `params` promise resolves to `{ slug: string }`; the `slug` is validated and normalized before lookup.
 * @returns A NextResponse containing JSON:
 * - On success: status 200 with `{ message: 'Event found sucessfully', event }`.
 * - If the slug is missing/invalid or no event matches: status 404 with an explanatory `message`.
 * Note: exceptions are logged to the console in development; the function does not produce an explicit error response on thrown exceptions.
 */
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