// Importing components
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import Content from "./content";
import HeaderSection from "../../../components/headerSection";

const description =
  "WiFi Survey solution offers a comprehensive set of features and benefits designed to optimize WiFi network performance, coverage, and user experience.";

export default function WifiSurveyPage() {
  return (
    <div className="wifisurvey">
      <Header styleElements={{ linksColor: "purple-header-links" }} />
      <HeaderSection title="Wifi Survey" description={description} />
      <Content />
      <Footer />
    </div>
  );
}
