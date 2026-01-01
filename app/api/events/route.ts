import connectDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@/models'; // make sure the default export matches
import { v2 as cloudinary } from 'cloudinary';
/**
 * Create a new Event by uploading the provided image to Cloudinary and saving the event data to the database.
 *
 * @returns A JSON NextResponse containing the created event and status 201 on success; a 400 JSON response if the image is missing; a 500 JSON response with an error message on failure.
 */
export async function POST(request: NextRequest) {
  let uploadResult;
  try {
    await connectDB();

    // Parse form data
    let eventData: any;

    if (request.headers.get('content-type')?.includes('application/json')) {
      // If client sends JSON
      eventData = await request.json();
    } else {
      // If client sends multipart/form-data
      const formdata = await request.formData();
      eventData = Object.fromEntries(formdata.entries());
   

    const file = formdata.get('image') as File;

    if(!file){
      return NextResponse.json({message : 'Image file is required'},{status : 400});
    }

    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

     uploadResult = await new Promise((resolve, reject)=>{
       cloudinary.uploader.upload_stream({ resource_type : 'image', folder : 'DevEvent'},(error, results) => {
        if(error) return reject(error);
        resolve(results);
      }).end(buffer);
    })
   
    }
    eventData.image = (uploadResult as { secure_url : string}).secure_url;


    const createEvent = await Event.create(eventData);
    return NextResponse.json(
      { message: 'Event Created Successfully', event: createEvent },
      { status: 201 }
    );
}catch(e) {
    console.error(e);
    return NextResponse.json(
      { message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown' },
      { status: 500 }
    );
  }
}

/**
 * Retrieve all Event documents sorted by newest first.
 *
 * Connects to the database and returns events ordered by `createdAt` descending.
 *
 * @returns A JSON HTTP response containing a success message and an `events` array with status `200` on success; on failure, a JSON response with an `error` message and status `500`.
 */
export async function GET (){
  try{
    await connectDB();

    const events = await Event.find().sort({createdAt : -1});

    return NextResponse.json({message : 'Event fetched sucessful' , events : events},{status : 200});
  }catch(e){
    return NextResponse.json({message : 'Event fetching Failed', error : e  instanceof Error ? e.message : 'unknown'  },{status : 500})
  }
}