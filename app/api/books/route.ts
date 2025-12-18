
import books from "../db";

export async function GET(){
return Response.json(books)
}



export async function POST(request: Request) {
  let newBook;
 
  try {
    newBook = await request.json();
    console.log(newBook,'dsdsds')
  } catch {
    return Response.json(
      { message: "Invalid JSON" },
      { status: 400 }
    );
  }

  if (
    typeof newBook !== "object" ||
    newBook === null ||
    typeof newBook.id !== "number" ||
    typeof newBook.name !== "string"
  ) {
    return Response.json(
      { message: "Invalid Book Format" },
      { status: 400 }
    );
  }

  books.push(newBook);

  return Response.json(books, { status: 201 });
}
