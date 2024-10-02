import DashboardCard from "@/components/dashboard/dashboard-card";
import { UsersRound, School, NotepadText, ListCheck } from "lucide-react";
import { GetTotalRooms } from "@/lib/actions/rooms";
import { GetTotalAppointments } from "@/lib/actions/appointments";
import { GetTotalAttendances } from "@/lib/actions/attendances";
import { GetTotalUsers } from "@/lib/actions/users";
import AppointmentsTable from "@/components/dashboard/appointments-table";
import AttendancesTable from "@/components/dashboard/attendances-table";

export default async function Dashboard() {
  const [rooms, appointments, attendances, users] = await Promise.all([
    GetTotalRooms(),
    GetTotalAppointments(),
    GetTotalAttendances(),
    GetTotalUsers(),
  ]);

  const cards = [
    {
      title: "Total Rooms",
      number: rooms,
      icon: <School size={25} className="text-primary" />,
    },
    {
      title: "Total Appointments",
      number: appointments,
      icon: <NotepadText size={25} className="text-primary" />,
    },
    {
      title: "Attendances",
      number: attendances,
      icon: <ListCheck size={25} className="text-primary" />,
    },
    {
      title: "Users",
      number: users,
      icon: <UsersRound size={25} className="text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-2xl">
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-4">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mt-4">
        <div className="w-full">
          <AppointmentsTable searchQuery="" page={1} />
        </div>
        <div className="w-full lg:w-[50%]">
          <AttendancesTable searchQuery="" page={1} />
        </div>
      </div>
    </div>
  );
}
