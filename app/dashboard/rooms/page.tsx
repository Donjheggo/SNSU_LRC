import SearchBar from "@/components/search-bar";
import RoomsTable from "@/components/room/table";
import CreateRoomDialog from "@/components/room/create-dialog";

export default function Rooms({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl">Rooms</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <CreateRoomDialog />
        </div>
        <div className="mt-2">
          <RoomsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
