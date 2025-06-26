import MainTitle from "./main-title";
import MenuItem from "./menu-item";
import { MENU_ITEMS } from "@/lib/constants";

export default function MainMenu() {
  return (
    <div className="bg-muted overflow-auto p-4">
      <div className="border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MainTitle />
      </div>
      <div className="py-4">
        {MENU_ITEMS.map((item) => (
          <MenuItem href={item.href}>{item.label}</MenuItem>
        ))}
      </div>
    </div>
  );
}
