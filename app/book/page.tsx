"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HomeLayout from "@/components/home-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { GetAllRooms } from "@/lib/actions/rooms";
import { toast } from "react-toastify";
import { CreateAppointment } from "@/lib/actions/appointments";
import { Loader } from "lucide-react";
import { GetScheduleByRoomId } from "@/lib/actions/schedules";
import type { RoomsT } from "@/components/room/update-form";
import type { SchedulesT } from "@/components/schedules/create-dialog";
import { useRouter } from "next/navigation";

export default function Book() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomsT[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [roomSchedules, setRoomSchedules] = useState<SchedulesT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRoomSchedule = async () => {
    if (selectedRoomId) {
      const data = await GetScheduleByRoomId(selectedRoomId);
      if (data) setRoomSchedules(data);
    }
  };

  const fetchRooms = async () => {
    const data = await GetAllRooms();
    if (data) setRooms(data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      fetchRoomSchedule();
    }
  }, [selectedRoomId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (
      !formData.get("room_id") ||
      !formData.get("schedule_id") ||
      !formData.get("name") ||
      !formData.get("course_and_year") ||
      !formData.get("organization_name") ||
      !formData.get("purpose") ||
      !formData.get("participants_count")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await CreateAppointment(formData);
      if (error) {
        toast.error(error.toString());
      }
      toast.success("Booking Submitted. 😁");
      router.push("/appointments");
    } catch (error) {
      toast.error("There was an unexpected error creating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeLayout>
      <Card className="w-auto md:w-[600px] mx-auto h-[600px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">
            Book an Appointment
          </CardTitle>
          <CardDescription>Fill all inputs and submit.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room_id" className="text-right">
                  Room
                </Label>
                <div className="col-span-3">
                  <Select
                    name="room_id"
                    onValueChange={(value) => setSelectedRoomId(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {rooms?.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule_id" className="text-right">
                  Schedule
                </Label>
                <div className="col-span-3">
                  <Select name="schedule_id">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {roomSchedules.length > 0 ? (
                          roomSchedules.map((item, index) => (
                            <SelectItem
                              key={index}
                              value={item.id}
                              className="w-full"
                            >
                              {new Date(item.start_time).toLocaleDateString()} -
                              {new Date(item.start_time).toLocaleTimeString()}{" "}
                              <br />
                              {new Date(item.end_time).toLocaleDateString()} -
                              {new Date(item.end_time).toLocaleTimeString()}
                            </SelectItem>
                          ))
                        ) : (
                          <p className="px-2">
                            No schedules available for this room.
                          </p>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="participants_count" className="text-right">
                  Participant counts:
                </Label>
                <Input
                  name="participants_count"
                  id="participants_count"
                  type="number"
                  placeholder=""
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder=""
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course_and_year" className="text-right">
                  Course Year Section
                </Label>
                <Input
                  name="course_and_year"
                  id="course_and_year"
                  type="text"
                  placeholder=""
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="organization_name" className="text-right">
                  Organization name
                </Label>
                <Input
                  name="organization_name"
                  id="organization_name"
                  type="text"
                  placeholder=""
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purpose" className="text-right">
                  Purpose
                </Label>
                <Textarea
                  name="purpose"
                  id="purpose"
                  placeholder=""
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <Button
              size="lg"
              disabled={loading}
              type="submit"
              className="w-full mt-4"
            >
              {loading ? <Loader className="animate-spin" /> : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </HomeLayout>
  );
}
