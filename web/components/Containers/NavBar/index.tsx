import WithKathaLogo from "@/components/withKathaLogo";
import Link from "next/link";
import type { FC } from "react";

const NavBar: FC = () => {
  return (
    <nav className="h-[60px] w-full z-50 border-b-2 bg-card fixed">
      <div className="mx-16 px-6 h-full flex items-center">
        <WithKathaLogo />
      </div>
    </nav>
  );
};

export default NavBar;
