import Image from "next/image";
import auth from "@/app/auth.png";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">{children}</div>
      <div className="hidden lg:block">
        <Image
          src={auth}
          alt="Image"
          width="800"
          height="400"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}
