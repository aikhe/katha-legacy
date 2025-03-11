import type { FC } from "react";
import KathaLogo from "./Common/KathaLogo";
import Link from "next/link";

const WithKathaLogo: FC = () => {
  return (
    <Link href="/">
      <KathaLogo />
    </Link>
  );
};

export default WithKathaLogo;
