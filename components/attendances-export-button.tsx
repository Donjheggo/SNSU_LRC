"use client";

import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { AttendanceExportToExcel } from "@/lib/utils";
import { Tables } from "@/database.types";

type AttendancesT = Tables<"attendances">;

export default function AttendanceExportButton({
  attendances,
}: {
  attendances: AttendancesT[];
}) {
  return (
    <Button
      variant="default"
      className="flex items-center"
      onClick={() => AttendanceExportToExcel(attendances)}
    >
      <File size={18} className="mr-2" /> Export
    </Button>
  );
}
