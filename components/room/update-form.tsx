"use client";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UpdateRoom } from "@/lib/actions/rooms";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Tables } from "@/database.types";

export type RoomsT = Tables<"rooms">;

export default function UpdateRoomForm({ item }: { item: RoomsT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get("name")) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateRoom(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/rooms");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="name">Room name</Label>
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
          <Input
            name="name"
            id="name"
            type="text"
            placeholder=""
            required
            defaultValue={item.name}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
