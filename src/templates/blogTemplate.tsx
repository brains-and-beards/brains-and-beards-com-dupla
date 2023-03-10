import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/shared/layout/SEO";
import Layout from "./layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PostLink from "../components/Blog/PostLink";
import AuthorWithPictureAndText from "../components/Blog/AuthorWithPictureAndText";
import Newsletter from "../components/Blog/Newsletter";
// import ReactNativeAnimatedCodeInput from '../components/ReactNativeAnimatedCodeInput'
import SubscribeFootnote from "../components/Blog/SubscribeFootnote";
import HiringFootnote from "../components/Blog/HiringFootnote";

const renderDate = (date) => <p className="date">{date}</p>;

export const query = graphql`
  query ($id: String) {
    # id is injected into context via gatsby-node.js
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY")
        # demo # React Native Web demo
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
        imageCaption
        thumbnailImage: image {
          childImageSharp {
            gatsbyImageData(
              formats: JPG
              height: 300
              width: 300
              quality: 90
              transformOptions: { fit: CONTAIN, cropFocus: CENTER }
            )
          }
        }
        path
        title
      }
    }
    relatedStoriesMdx: allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        frontmatter {
          author
          path
          title
          date(formatString: "MMMM DD, YYYY")
          image {
            childImageSharp {
              gatsbyImageData(
                width: 280
                height: 200
                transformOptions: { cropFocus: CENTER }
              )
            }
          }
        }
      }
    }
  }
`;

const BlogTemplate = ({
  data: { mdx, relatedStoriesMdx },
  children, // It's set as contentFilePath in gatsby-node.js
}) => {
  const {
    id,
    frontmatter: {
      title,
      date,
      image,
      author,
      imageCaption, //, demo
    },
  } = mdx;

  const related = getRelatedStories(relatedStoriesMdx.nodes, id).map((node) => {
    return <PostLink key={node.id} post={node} />;
  });

  return (
    <Layout headerTitle={title} headerSub={renderDate(date)}>
      <div className="blog-body">
        {image && (
          <div className="top-part-yellow">
            <div className="content">
              <GatsbyImage
                image={getImage(image)}
                alt={imageCaption}
                imgClassName="main-blog-image webfeedsFeaturedVisual"
              />
              {imageCaption ? (
                <figcaption
                  className="main-blog-image-caption"
                  dangerouslySetInnerHTML={{ __html: imageCaption }}
                />
              ) : null}
            </div>
          </div>
        )}
        <div className="narrow-column">
          <div>{children}</div>
          {/* {demo === 'AnimatedInput' && <ReactNativeAnimatedCodeInput />} */}
          <SubscribeFootnote />
          <HiringFootnote />
          <AuthorWithPictureAndText author={author} text={"WRITTEN BY"} />
        </div>
        <Newsletter />
        <div className="narrow-column">
          <section>
            <h3>More Brains and Beards stories</h3>
            <div className="more-stories">{related}</div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default BlogTemplate;

const getRelatedStories = (nodes, id) => {
  const myIndex = nodes.findIndex((s) => s.id === id);
  const count = nodes.length;

  const previous = myIndex === 0 ? count - 1 : myIndex - 1;
  const next = myIndex === count - 1 ? 0 : myIndex + 1;

  return [nodes[previous], nodes[next]];
};

export const Head = (props) => {
  const {
    pageContext: { author, title, excerpt, date },
    location: { pathname },
    data,
  } = props;

  const thumbnailPath =
    data.mdx.frontmatter.thumbnailImage.childImageSharp.gatsbyImageData.images
      .fallback.src;
  const thumbnailUrl = `https://brainsandbeards.com${thumbnailPath}`;

  return (
    <>
      <SEO title={title} description={excerpt} article pathname={pathname} />
      <script type="application/ld+json">
        {`{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': 'https://brainsandbeards.com${pathname}',
          'headline': '${title}',
          'description': '${excerpt}',
          'datePublished': '${date}',
          'dateModified': '${date}',
          'dateCreated': '${date}',
          'thumbnailURL': '${thumbnailUrl}',
          'thumbnail': '${thumbnailUrl}',
          'author': {
            '@type': '${
              author === "Brains&Beards" ? "Organization" : "Person"
            }',
            'name': '${author}'
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Brains & Beards',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://brainsandbeards.com/bb.png'
            }
          }
        }`}
      </script>
    </>
  );
};
