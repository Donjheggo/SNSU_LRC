"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import HomeLayout from "@/components/home-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import { CreateAttendance } from "@/lib/actions/attendances";
import { Loader } from "lucide-react";

export default function Attendance() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("name") ||
      !formData.get("course_and_year") ||
      !formData.get("id_number")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await CreateAttendance(formData);
      if (error) {
        toast.error(error.toString());
      }
      toast.success("Attendance Submitted. 😁");
    } catch (error) {
      toast.error("There was an unexpected error creating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeLayout>
      <Card className="w-auto md:w-[600px] mx-auto h-[370px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">
            Fill up Attendance
          </CardTitle>
          <CardDescription>Fill all inputs and submit.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
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
                <Label htmlFor="id_number" className="text-right">
                  ID Number
                </Label>
                <Input
                  name="id_number"
                  id="id_number"
                  type="text"
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
