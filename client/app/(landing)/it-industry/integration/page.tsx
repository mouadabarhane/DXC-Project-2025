// Importing components
import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import HeaderSection from "@/app/components/headerSection";
import Section from "./section";

const description =
  "Integration Industrie IT solution offers a comprehensive suite of features and benefits designed to streamline and synchronize industrial operations with IT infrastructure.";

export default function IntegrationPage() {
  return (
    <div className="integration">
      <Header styleElements={{ linksColor: "purple-header-links" }} />
      <HeaderSection title="Integration" description={description} />
      <Section />
      <Footer />
    </div>
  );
}
