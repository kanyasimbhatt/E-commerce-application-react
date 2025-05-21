import Navbar from '../src/Components/Navbar/Navbar';

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
