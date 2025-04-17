import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import Section from "./section";
import HeaderSection from "../../../components/headerSection";

const description =
  "Data loss can be catastrophic for businesses, leading to operational disruptions, financial loss, and damaged reputation. Our backup solution provides a reliable and comprehensive method to protect and recover critical data, ensuring business continuity and peace of mind.";

export default function BackUpSolutionPage() {
  return (
    <div className="backupsolution">
      <Header styleElements={{ linksColor: "purple-header-links" }} />
      <HeaderSection title="Back Up Solution" description={description} />
      <Section />
      <Footer />
    </div>
  );
}
