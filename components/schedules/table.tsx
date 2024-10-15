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
  DropdownMenuSeparator,
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
import { GetSchedules, GetTotalSchedules } from "@/lib/actions/schedules";
import { TablePagination } from "./pagination";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default async function SchedulesTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalSchedules, schedules] = await Promise.all([
    GetTotalSchedules(),
    GetSchedules(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalSchedules / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Schedules</CardTitle>
        <CardDescription>Manage schedules.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Room</TableHead>
              <TableHead className="table-cell">Start time</TableHead>
              <TableHead className="table-cell">End time</TableHead>
              <TableHead className="table-cell">Availability</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold text-lg">
                  {item.room_id.name}
                </TableCell>
                <TableCell>
                  {new Date(item.start_time).toLocaleDateString()} -
                  {new Date(item.start_time).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {new Date(item.end_time).toLocaleDateString()} -
                  {new Date(item.end_time).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {item.available ? (
                    <Badge variant="default">Available</Badge>
                  ) : (
                    <Badge variant="outline">Unavailable</Badge>
                  )}
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
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
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
          <strong>{Math.min(page * items_per_page, totalSchedules)}</strong> of{" "}
          <strong>{totalSchedules}</strong> schedules
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
