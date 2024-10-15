"use client";

import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { ExportToExcel } from "@/lib/utils";
import type { AppointmentsT } from "@/app/dashboard/appointments/page";

export default function ExportToExcelButton({
  appointments,
}: {
  appointments: AppointmentsT[];
}) {
  console.log("Appointments: ", appointments);
  return (
    <Button
      variant="default"
      className="flex items-center"
      onClick={() => ExportToExcel(appointments)}
    >
      <File size={18} className="mr-2" /> Export
    </Button>
  );
}
