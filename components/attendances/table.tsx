import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { GetAttendances, GetTotalAttendances } from "@/lib/actions/attendances";
import { TablePagination } from "./pagination";
import DeleteButton from "./delete-button";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export default async function AttendancesTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalAttendances, attendances] = await Promise.all([
    GetTotalAttendances(),
    GetAttendances(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalAttendances / items_per_page);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Attendances</CardTitle>
        <CardDescription>Manage attendances.</CardDescription>
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
              <TableHead className="table-cell">Submitted</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
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
                <TableCell className="font-semibold">
                  {new Date(item.created_at).toLocaleTimeString()} -{" "}
                  {new Date(item.created_at).toDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalAttendances)}</strong>{" "}
          of <strong>{totalAttendances}</strong> attendances
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
