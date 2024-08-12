import { ThemeProvider } from "next-themes";
import Navbar from "./nav/Navbar";
import Footer from "./Footer";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <ThemeProvider attribute="class">
      <Navbar />
      <main className="mt-[65px] w-full min-h-[calc(100vh-125px)] semi-mobile:mt-[55px] semi-mobile:min-h-[calc(100vh-115px)] semi-mobile:text-[15px]">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default Container;
