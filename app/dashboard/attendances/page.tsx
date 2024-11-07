import SearchBar from "@/components/search-bar";
import AttendancesTable from "@/components/attendances/table";
// import ExportButton from "@/components/attendances/export-button";

export default function Attendances({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl">Attendances</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          {/* <ExportButton /> */}
        </div>
        <div className="mt-2">
          <AttendancesTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
