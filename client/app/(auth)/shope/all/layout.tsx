// import Header from "../components/Header";
import Providers from "../components/Providers";
import "../styles/globals.css";
import Sidebar from "../../dashboard/components/Sidebar";
import Footer from "../../dashboard/components/Footer";
import Header from "../../dashboard/components/header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white min-h-screen-100 w-5/6 ">
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </div>
    </div>
  );
}
