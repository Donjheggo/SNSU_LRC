"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UpdateSchedule } from "@/lib/actions/schedules";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import type { RoomsT } from "./create-dialog";

export default function UpdateScheduleForm({ item }: { item: SchedulesT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("start_time") ||
      !formData.get("end_time") ||
      !formData.get("available")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateSchedule(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/schedules");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localDateData = new Date(date.getTime() - offset)
      .toISOString()
      .slice(0, 16);
    return localDateData;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
        </div>
        <h1 className="text-center font-semibold text-xl">
          {item.room_id.name}
        </h1>
        <div className="grid gap-2">
          <Label htmlFor="start_time">Start time</Label>
          <Input
            name="start_time"
            id="start_time"
            type="datetime-local"
            placeholder=""
            required
            defaultValue={formatDateTime(new Date(item.start_time))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end_time">End time</Label>
          <Input
            name="end_time"
            id="end_time"
            type="datetime-local"
            placeholder=""
            required
            defaultValue={formatDateTime(new Date(item.end_time))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end_time">Availability</Label>
          <Select name="available" defaultValue={String(item.available)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">Available</SelectItem>
                <SelectItem value="false">Unavailable</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

type SchedulesT = {
  id: string;
  room_id: RoomsT;
  end_time: string;
  start_time: string;
  available: boolean;
};
