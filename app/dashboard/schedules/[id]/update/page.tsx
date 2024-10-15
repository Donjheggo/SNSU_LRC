import { ArrowLeft } from "lucide-react";
import { GetScheduleById } from "@/lib/actions/schedules";
import Link from "next/link";
import UpdateScheduleForm from "@/components/schedules/update-form";

export default async function UpdateCustomer({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetScheduleById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateScheduleForm item={item} />
      </div>
    </div>
  );
}
