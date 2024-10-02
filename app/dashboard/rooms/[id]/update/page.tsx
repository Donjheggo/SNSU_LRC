import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GetRoomById } from "@/lib/actions/rooms";
import UpdateRoomForm from "@/components/room/update-form";

export default async function UpdateCustomer({
  params,
}: {
  params: { id: string };
}) {
  const event = await GetRoomById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateRoomForm item={event} />
      </div>
    </div>
  );
}
