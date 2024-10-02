import HomeLayout from "@/components/home-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Users, CheckSquare } from "lucide-react";
import attendance from "@/app/attendance.png";
import rooms from "@/app/rooms.png";
import book from "@/app/book.png";
import Image from "next/image";

export default function LandingPage() {
  return (
    <HomeLayout>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl text-primary font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                SNSU Learning Resource Center
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl ">
                Simplify your booking and attendance.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/book">Start Booking</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/rooms">View Rooms</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Key Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 border rounded-lg  transition-transform hover:scale-105">
              <a href={book.src} download="book-image">
                <Image src={book} alt="book" width={500} height={500} />
              </a>
              <Calendar className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Easy Booking</h3>
              <p className="text-sm text-gray-500 ">
                Book rooms and resources with just a few clicks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 border rounded-lg  transition-transform hover:scale-105">
              <a href={attendance.src} download="attendance-image">
                <Image
                  src={attendance}
                  alt="attendance"
                  width={500}
                  height={500}
                />
              </a>
              <Users className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Attendance Tracking</h3>
              <p className="text-sm text-gray-500 ">
                Keep track of attendance effortlessly.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 border rounded-lg  transition-transform hover:scale-105">
              <a href={rooms.src} download="rooms-image">
                <Image src={rooms} alt="rooms" width={500} height={500} />
              </a>
              <CheckSquare className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Room Management</h3>
              <p className="text-sm text-gray-500 ">
                Efficiently manage and monitor room usage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}
