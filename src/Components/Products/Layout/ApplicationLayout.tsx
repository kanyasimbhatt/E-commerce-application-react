import Navbar from '../../Navbar/Navbar';

type ChildrenType = {
  children: React.ReactNode;
};

const ApplicationLayout = ({ children }: ChildrenType) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ApplicationLayout;
