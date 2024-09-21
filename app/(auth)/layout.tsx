const AuthLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <div className="flex items-center justify-center my-10">
        {children}
      </div>
    );
  };
  
  export default AuthLayout;