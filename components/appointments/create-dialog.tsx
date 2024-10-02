"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CreateAppointment } from "@/lib/actions/appointments";
import { GetAllRooms } from "@/lib/actions/rooms";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Tables } from "@/database.types";

export type RoomsT = Tables<"rooms">;

export default function CreateAppointmentDialog() {
  const [rooms, setRooms] = useState<RoomsT[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await GetAllRooms();
      if (data) setRooms(data);
    };
    fetchRooms();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("room_id") ||
      !formData.get("name") ||
      !formData.get("course_and_year") ||
      !formData.get("date") ||
      !formData.get("purpose")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }

    try {
      const { error } = await CreateAppointment(formData);
      if (error) {
        toast.error(error.toString());
      }
    } catch (error) {
      toast.error("There was an unexpected error creating.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <Plus size={18} className="mr-2" /> Create Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
              Complete the fields and hit create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room_id" className="text-right">
                Room
              </Label>
              <div className="col-span-3">
                <Select name="room_id">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Customer" />
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
                Course and Year
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
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                name="date"
                id="date"
                type="datetime-local"
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
