import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <h1 className=" font-helvetica">Auth Layout</h1>
      {children}
    </>
  );
};

export default AuthLayout;
