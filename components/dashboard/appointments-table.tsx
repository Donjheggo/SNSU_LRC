import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAppointments } from "@/lib/actions/appointments";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export default async function AppointmentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [appointments] = await Promise.all([
    GetAppointments(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Appointments</CardTitle>
          <Link href="/dashboard/appointments">
            <Button variant="outline" className="flex items-center">
              View More
              <MoveUpRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Course and Year</TableHead>
              <TableHead className="table-cell">Organization Name</TableHead>
              <TableHead className="table-cell">Room</TableHead>
              <TableHead className="table-cell">Date</TableHead>
              <TableHead className="table-cell">Purpose</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="font-semibold">
                  {item.course_and_year}
                </TableCell>
                <TableCell className="font-semibold">
                  {item.organization_name}
                </TableCell>
                <TableCell className="font-semibold">
                  {item.room_id.name}
                </TableCell>
                <TableCell className="font-semibold">{item.date}</TableCell>
                <TableCell className="font-semibold">{item.purpose}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
