import HomeLayout from "@/components/home-layout";
import SearchBar from "@/components/search-bar";
import RoomsTable from "@/components/home-rooms";

export default function Rooms({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <HomeLayout>
      <div className="w-auto md:w-[500px] mx-auto">
        <h1 className="text-center text-2xl">Rooms</h1>
        <div>
          <div className="w-full mt-4">
            <SearchBar />
          </div>
          <div className="mt-2">
            <RoomsTable searchQuery={searchQuery} page={page} />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
