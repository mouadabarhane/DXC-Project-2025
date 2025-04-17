import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import Section from "./section";
import Content from "./content";

export default function SslCertificationPage() {
  return (
    <div className="sslcertification">
      <Header styleElements={{ linksColor: "purple-header-links" }} />
      <Section />
      <Content />
      <Footer />
    </div>
  );
}
