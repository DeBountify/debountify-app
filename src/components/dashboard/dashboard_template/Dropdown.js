import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconTemplate from "@/components/Icons/IconTemplate";
import { Badge } from "@/components/ui/badge";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="relative">
          <IconTemplate
            icon={"ion:notifications-outline"}
            className="text-3xl"
            text-white
          />
          <Badge className="absolute top-0 right-0 bg-red-400 px-[0.20rem] py-0 rounded-full hover:bg-red-400">
            3
          </Badge>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gradient-to-r from-bg-black to-bg_purple_r text-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
