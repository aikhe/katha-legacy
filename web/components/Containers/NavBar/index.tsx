import WithKathaLogo from "@/components/withKathaLogo";
import type { FC } from "react";

const NavBar: FC = () => {
  return (
    <header className="h-[60px] w-full z-50 border-b-2 bg-card fixed">
      <div className="mx-16 px-6 h-full flex items-center">
        <WithKathaLogo />
      </div>
    </header>
  );
};

export default NavBar;
