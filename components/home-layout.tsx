import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import placeholder from "@/app/favicon.ico";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="container mx-auto max-w-screen-xl hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image src={placeholder} width={40} height={40} alt="logo" />
            <span className="text-primary font-bold text-xl">SNSU LRC</span>
          </Link>
          <div className="ml-auto font-semibold flex items-center gap-4">
            {userLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Image src={placeholder} width={40} height={40} alt="logo" />
                <span className="text-primary font-bold text-xl">SNSU LRC</span>
              </Link>
              {userLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="min-h-[87vh] p-5 grid gap-6 container max-w-screen-xl mx-auto">
        {children}
      </main>
      <footer className="w-full py-4 px-4 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 SNSU LRC
          </p>
          <p className="text-sm text-gray-500 flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

const userLinks = [
  {
    name: "Book",
    href: "/book",
  },
  {
    name: "Attendance",
    href: "/attendance",
  },
  {
    name: "Rooms",
    href: "/rooms",
  },
  {
    name: "Login",
    href: "/auth/sign-in",
  },
];
