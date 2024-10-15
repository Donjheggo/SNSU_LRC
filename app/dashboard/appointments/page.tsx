"use server";

import SearchBar from "@/components/search-bar";
import AppointmentsTable from "@/components/appointments/table";
import { GetAllAppointments } from "@/lib/actions/appointments";
import { Tables } from "@/database.types";
import ExportToExcelButton from "@/components/export-button";

export default async function Appointments({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const appointments = await GetAllAppointments();

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl">Appointments</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <ExportToExcelButton appointments={appointments} />
        </div>
        <div className="mt-2">
          <AppointmentsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
type RoomsT = Tables<'rooms'>
type ScheduleT = Tables<"schedules">;
export type AppointmentsT = {
  course_and_year: string;
  created_at: string;
  id: string;
  name: string;
  participants_count: number;
  purpose: string;
  room_id: RoomsT;
  schedule_id: ScheduleT;
};
