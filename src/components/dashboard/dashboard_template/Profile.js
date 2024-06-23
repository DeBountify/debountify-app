import { User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSelector } from "react-redux";

export function DropdownMenuDemo2() {
  const { userState } = useSelector((state) => state.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="relative">
          <img
            className="object-cover w-8 h-8 rounded-full"
            src={process.env.PINATA_VIEW_API + userState?.userImage}
            alt={userState?.username}
            aria-hidden="true"
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer">
          <Link
            className="flex justify-center items-center flex-row"
            href={`/dashboard/${
              userState?.userType === "Company" ? "company" : "user"
            }/profile`}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
