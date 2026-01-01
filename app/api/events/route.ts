import connectDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@/models'; // make sure the default export matches
import { v2 as cloudinary } from 'cloudinary';
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

export async function GET (){
  try{
    await connectDB();

    const events = await Event.find().sort({createdAt : -1});

    return NextResponse.json({message : 'Event fetched sucessful' , events : events},{status : 200});
  }catch(e){
    return NextResponse.json({message : 'Event fetching Failed', error : e  instanceof Error ? e.message : 'unknown'  },{status : 500})
  }
}
