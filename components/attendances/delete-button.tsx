import { DeleteAttendance } from "@/lib/actions/attendances";
import { TrashIcon } from "lucide-react";

export default function DeleteButton({ id }: { id: string }) {
  const deleteAttendanceById = DeleteAttendance.bind(null, id);

  return (
    <form action={deleteAttendanceById} className="cursor-pointer w-full">
      <button type="submit">
        <span className="flex items-center gap-2 text-base text-red-500">
          <TrashIcon width={20} /> Delete
        </span>
      </button>
    </form>
  );
}