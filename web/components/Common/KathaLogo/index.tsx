import { FC } from "react";

import Katha from "@/components/Icons/Logos/Katha";
import Link from "next/link";

const KathaLogo: FC = () => {
  return (
    <Link href="/" className="flex w-fit items-center gap-[.25rem]">
      <Katha />

      <span className="font-helvetica text-[#121212] tracking-[-2%] text-[18px] font-bold">
        Katha
      </span>
    </Link>
  );
};

export default KathaLogo;
