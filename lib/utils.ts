import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import type { AppointmentsT } from "@/app/dashboard/appointments/page";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormatDateTime = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  const localDateData = new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
  return localDateData;
};

export const ExportToExcel = (data: AppointmentsT[]) => {
  const exportData = data.map((item) => ({
    Name: item.name,
    "Course and Year": item.course_and_year,
    Room: item.room_id.name,
    Schedule: `${new Date(
      item.schedule_id.start_time
    ).toLocaleDateString()} ${new Date(
      item.schedule_id.start_time
    ).toLocaleTimeString()} - ${new Date(
      item.schedule_id.end_time
    ).toLocaleDateString()} ${new Date(
      item.schedule_id.end_time
    ).toLocaleTimeString()}`,
    Participants: item.participants_count,
    Purpose: item.purpose,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
  XLSX.writeFile(workbook, "appointments.xlsx");
};
