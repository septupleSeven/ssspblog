import { ThemeProvider } from "next-themes";
import Navbar from "./nav/Navbar";
import Footer from "./Footer";
import StoreProvider from "./StoreProvider";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <ThemeProvider attribute="class">
      <StoreProvider>
        <Navbar />
        <main className="mt-[65px] min-h-[calc(100vh-125px)] w-full semi-mobile:mt-[55px] semi-mobile:min-h-[calc(100vh-115px)] semi-mobile:text-[15px]">
          {children}
        </main>
        <Footer />
      </StoreProvider>
    </ThemeProvider>
  );
};

export default Container;
