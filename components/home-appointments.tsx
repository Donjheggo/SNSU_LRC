import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetAppointments,
  GetTotalAppointments,
} from "@/lib/actions/appointments";
import { TablePagination } from "./appointments/pagination";

export default async function AppointmentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalAppointments, appointments] = await Promise.all([
    GetTotalAppointments(),
    GetAppointments(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalAppointments / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Course and Year</TableHead>
              <TableHead className="table-cell">Organization Name</TableHead>
              <TableHead className="table-cell">Room</TableHead>
              <TableHead className="table-cell">Schedule</TableHead>
              <TableHead className="table-cell">Participants count</TableHead>
              <TableHead className="table-cell">Purpose</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold text-lg">
                  {item.name}
                </TableCell>
                <TableCell>{item.course_and_year}</TableCell>
                <TableCell>{item.organization_name}</TableCell>
                <TableCell>{item.room_id.name}</TableCell>
                <TableCell>
                  {new Date(item.schedule_id.start_time).toLocaleDateString()} -{" "}
                  {new Date(item.schedule_id.start_time).toLocaleTimeString()}
                  <br />
                  {new Date(
                    item.schedule_id.end_time
                  ).toLocaleDateString()} -{" "}
                  {new Date(item.schedule_id.end_time).toLocaleTimeString()}
                </TableCell>
                <TableCell>{item.participants_count}</TableCell>
                <TableCell>{item.purpose}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalAppointments)}</strong>{" "}
          of <strong>{totalAppointments}</strong> appointments
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
