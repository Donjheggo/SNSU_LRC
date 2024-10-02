import {
  Card,
  CardContent,
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
import { GetAttendances } from "@/lib/actions/attendances";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export default async function AttendancesTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [attendances] = await Promise.all([
    GetAttendances(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Attendances</CardTitle>
          <Link href="/dashboard/attendances">
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
              <TableHead className="table-cell">ID Number</TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">
                Course Year and Section
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendances?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">
                  {item.id_number}
                </TableCell>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="font-semibold">
                  {item.course_and_year}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
