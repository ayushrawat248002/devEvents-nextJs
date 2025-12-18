import books from "../../db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ REQUIRED in Next 15

  const numericId = Number(id);

  const selectedBook = books.find(
    (book) => book.id === numericId
  );

  if (!selectedBook) {
    return Response.json(
      { message: "Book not found" },
      { status: 404 }
    );
  }

  return Response.json(selectedBook);
}
