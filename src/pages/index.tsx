import React, { useMemo } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// import ContactForm from "../components/forms/ContactForm";
import Layout from "../templates/layout";
// import TrustBar from "../components/TrustBar";
// import EstimateProjectBar from "../components/EstimateProjectBar";
// import ClientLogos from "../components/ClientLogos";
// import ReferenceSwiper from "../components/ReferenceSwiper";
// import ReadMore from "../components/ReadMore";

import RotatingBadge from "../assets/illustrations/also-in.svg";
import RNBadge from "../assets/illustrations/rn.svg";
import useRandomHeroImage from "../components/Homepage/useRandomHeroImage";
// import SharooCaseStudyBar from "../components/caseStudyBar/SharooCaseStudyBar";
// import SEO from "../components/SEO";

const title = (
  <h1 className="text-center-mobile">We deliver great mobile applications</h1>
);

const RNSticker = () => (
  <div className="badge-container">
    <RotatingBadge className="rotating badge" />
    <RNBadge className="badge" />
  </div>
);

const MainPage = (props) => {
  const { data } = props;
  // const { serviceIconCrossPlatform, serviceIconNative, serviceIconStaff } =
  //   data;

  const [heroImage, heroImageMobile] = useRandomHeroImage();

  const subtitle = () => (
    <>
      {heroImageMobile}
      <p className="about-us">
        Brains & Beards is an unpretentious mobile studio that solves business
        problems through a mix of design and technology.
      </p>
      <p className="about-us">
        We are a remote team of experienced developers spread all over Europe
        who know how to get a great product shipped.
      </p>
    </>
  );

  const rightHeader = () => {
    return (
      <>
        {<RNSticker />}
        {heroImage}
      </>
    );
  };

  return (
    <Layout
      headerTitle={title}
      headerSub={subtitle()}
      headerColumns="skewed"
      rightContent={rightHeader()}
    >
      <div className="half-yellow mobile-only">{<RNSticker />}</div>

      <section className="center homepage-services">
        <h2> What can we help you with? </h2>
        <p> Pick a category to learn more: </p>
        {/* <div className="row">
        <div className="serviceContainer">
          <Link to="/services/cross-platform">
            <GatsbyImage
              image={getImage(serviceIconCrossPlatform)}
              alt="Cross platform"
            />
            <p className="quote">Cross-platform</p>
            <p className="service-info">
              Mobile apps in React Native and Flutter focused on fast delivery
            </p>
            <ReadMore text="Read more" />
          </Link>
        </div>
        <div className="serviceContainer">
          <Link to="/services/native-development">
            <GatsbyImage
              image={getImage(serviceIconNative)}
              alt="Native mobile development"
            />
            <p className="quote">iOS and Android</p>
            <p className="service-info">
              State-of-the-art applications built using native frameworks from
              Apple and Google
            </p>
            <ReadMore text="Read more" />
          </Link>
        </div>
        <div className="serviceContainer">
          <Link to="/services/team-augmentation/">
            <GatsbyImage
              image={getImage(serviceIconStaff)}
              alt="Staff augmentation"
            />
            <p className="quote">Staff Augmentation</p>
            <p className="service-info">
              Additional developers for your existing team to help dynamically
              scale your efforts
            </p>
            <ReadMore text="Read more" />
          </Link>
        </div>
      </div> */}
      </section>
      {/* // <TrustBar />
    // <EstimateProjectBar title="Build your product <br/>with Brains & Beards" />
    // <section className="clients">
    //   <div className="content">
    //     <h2> Our clients </h2>
    //     <p className="sub2">
    //       We help technology-driven organizations – from start-ups to large
    //       enterprises – develop software more efficiently.
    //     </p>
    //     <SharooCaseStudyBar pageType="home" />
    //     <ClientLogos short />
    //     <ReferenceSwiper />
    //   </div>
    // </section>
    //   <ContactForm /> */}
    </Layout>
  );
};

export const _homepageHeroImageProps = graphql`
  fragment homepageHeroImageProps on File {
    childImageSharp {
      gatsbyImageData(height: 710, width: 820)
    }
  }
`;

export const _imageProps = graphql`
  fragment illustrationIconImageProps on File {
    childImageSharp {
      gatsbyImageData(
        layout: FIXED
        height: 192
        quality: 90
        placeholder: BLURRED
      )
    }
  }
`;

export const query = graphql`
  query {
    heroBicycle: file(relativePath: { regex: "/hero-bicycle/" }) {
      ...homepageHeroImageProps
    }
    heroSkateboard: file(relativePath: { regex: "/hero-skateboard/" }) {
      ...homepageHeroImageProps
    }
    heroJogin: file(relativePath: { regex: "/hero-jogin/" }) {
      ...homepageHeroImageProps
    }
    serviceIconCrossPlatform: file(
      relativePath: { regex: "/services-cross-platform-icon/" }
    ) {
      ...illustrationIconImageProps
    }
    serviceIconNative: file(relativePath: { regex: "/services-native-icon/" }) {
      ...illustrationIconImageProps
    }
    serviceIconStaff: file(relativePath: { regex: "/services-staff-icon/" }) {
      ...illustrationIconImageProps
    }
  }
`;

export default MainPage;

// export const Head = ({ location }) => <SEO pathname={location.pathname} />;
