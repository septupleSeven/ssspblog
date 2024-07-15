import { ThemeProvider } from "next-themes";
import Navbar from "./Navbar";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <ThemeProvider attribute="class">
      <Navbar />
      <main className="mt-[65px] w-full">
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Container;
