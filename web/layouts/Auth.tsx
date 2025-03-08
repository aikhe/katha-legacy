import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <h1>Auth Layout</h1>
      {children}
    </>
  );
};

export default AuthLayout;
