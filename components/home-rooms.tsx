import {
  Card,
  CardContent,
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
import { GetRooms, GetTotalRooms } from "@/lib/actions/rooms";
import { TablePagination } from "./room/pagination";

export default async function RoomsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalRooms, rooms] = await Promise.all([
    GetTotalRooms(),
    GetRooms(searchQuery, page, items_per_page),
  ]);

  console.log(rooms);

  const totalPages = Math.ceil(totalRooms / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Room</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold text-lg">
                  {item.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalRooms)}</strong> of{" "}
          <strong>{totalRooms}</strong> rooms
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
