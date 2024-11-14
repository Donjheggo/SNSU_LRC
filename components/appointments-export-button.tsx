"use client";

import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { AppointmentsExportToExcel } from "@/lib/utils";
import type { AppointmentsT } from "@/app/dashboard/appointments/page";

export default function AppointmentExportButton({
  appointments,
}: {
  appointments: AppointmentsT[];
}) {
  console.log("Appointments: ", appointments);
  return (
    <Button
      variant="default"
      className="flex items-center"
      onClick={() => AppointmentsExportToExcel(appointments)}
    >
      <File size={18} className="mr-2" /> Export
    </Button>
  );
}
