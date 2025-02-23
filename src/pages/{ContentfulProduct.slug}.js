import React from "react";
import { Link, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import ReactMarkdown from "react-markdown";

import Layout from "../components/Layout";
import Consent from "../components/Consent";

import { Slide } from "react-slideshow-image";

import "../styles/product.css";
import "react-slideshow-image/dist/styles.css";

import home from "../images/home.png";
import back from "../images/back.png";

const ProductPage = (props) => {
  let products = props.data.allContentfulProduct.nodes;
  let slug = props.params.slug;

  const productTitle = products
    .filter((product) => product.slug === `/${slug}`)
    .map((product) => {
      return (
        <div key={product.slug}>
          <h1 className="product-title">{product.productName}</h1>
        </div>
      );
    });

  const navBack = products
    .filter((product) => product.slug === `/${slug}`)
    .map((product) => {
      return (
        <Link to={`/${product.categorySlug}`} className="nav-link">
          <img src={back} className="nav-icon-back" alt="back link" />
        </Link>
      );
    });

  const productInfo = products
    .filter((product) => product.slug === `/${slug}`)
    .map((product) => {
      function currencyFormat(price) {
        return price
          .toFixed(2)
          .replace(".", ",")
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
      const slideImages = product.headerImgs.map((headerImg) => {
        return { url: headerImg.file.url };
      });

      return (
        <>
          <Consent />
          <div key={product.slug}>
            <div className="slide-container">
              {slideImages.length > 1 ? (
                <Slide>
                  {slideImages.map((slideImage, index) => (
                    <div className="each-slide" key={index}>
                      <div
                        style={{
                          backgroundImage: `url(${slideImage.url})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          height: "30vh",
                        }}
                      />
                    </div>
                  ))}
                </Slide>
              ) : (
                <div>
                  {slideImages.map((slideImage, index) => (
                    <div className="each-slide" key={index}>
                      <div
                        style={{
                          backgroundImage: `url(${slideImage.url})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          height: "20vh",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {product.productIntro && (
              <ReactMarkdown className="product-intro">
                {product.productIntro.productIntro}
              </ReactMarkdown>
            )}
            <div className="product-page">
              {product.techTitle1 && (
                <div className="tech-description">
                  <h3>TECHNOLOGY</h3>
                  {product.techImg1 && (
                    <img
                      src={product.techImg1.file.url}
                      className="tech-img"
                      alt=""
                    />
                  )}
                  <h5>{product.techTitle1}</h5>
                  <p>{product.techDescription1.techDescription1}</p>
                </div>
              )}
              {product.techTitle2 && (
                <div className="tech-description">
                  {product.techImg2 && (
                    <img
                      src={product.techImg2.file.url}
                      className="tech-img"
                      alt=""
                    />
                  )}
                  <h5>{product.techTitle2}</h5>
                  <p>{product.techDescription2.techDescription2}</p>
                </div>
              )}
              {product.techTitle3 && (
                <div className="tech-description">
                  {product.techImg3 && (
                    <img
                      src={product.techImg3.file.url}
                      className="tech-img"
                      alt=""
                    />
                  )}
                  <h5>{product.techTitle3}</h5>
                  <p>{product.techDescription3.techDescription3}</p>
                </div>
              )}
              {product.techTitle4 && (
                <div className="tech-description">
                  {product.techImg4 && (
                    <img
                      src={product.techImg4.file.url}
                      className="tech-img"
                      alt=""
                    />
                  )}
                  <h5>{product.techTitle4}</h5>
                  <p>{product.techDescription4.techDescription4}</p>
                </div>
              )}
              {product.techTitle5 && (
                <div className="tech-description">
                  {product.techImg5 && (
                    <img
                      src={product.techImg5.file.url}
                      className="tech-img"
                      alt=""
                    />
                  )}
                  <h5>{product.techTitle5}</h5>
                  <p>{product.techDescription5.techDescription5}</p>
                </div>
              )}
              {product.techTitle6 && (
                <div className="tech-description">
                  {product.techImg6 && (
                    <img
                      src={product.techImg6.file.url}
                      className="tech-img"
                      alt=""
                    />
                  )}
                  <h5>{product.techTitle6}</h5>
                  <p>{product.techDescription6.techDescription6}</p>
                </div>
              )}
            </div>
            <div className="product-page">
              {product.specs && (
                <div>
                  <h3>{`Srixon ${product.productName} specs`}</h3>
                  <img
                    src={product.specs.file.url}
                    className="specs-img"
                    alt=""
                  />
                </div>
              )}
              {product.colors && (
                <div>
                  <h4>Available colors</h4>
                  <p>{product.colors}</p>
                </div>
              )}
              {product.euro && (
                <>
                  {product.price1title == null ? (
                    <h3>{`Srixon ${product.productName} price`}</h3>
                  ) : (
                    <h3>{`Srixon ${product.price1title} price`}</h3>
                  )}

                  <p>
                    {currencyFormat(product.euro)} &euro;/{" "}
                    {currencyFormat(product.swiss)} CHF /{" "}
                    {currencyFormat(product.kroner)} SEK /{" "}
                    {currencyFormat(product.pound)} &#163;
                  </p>
                </>
              )}
              {product.euro2 && (
                <>
                  {product.price2title == null ? (
                    <h3>{`Srixon ${product.productName} price`}</h3>
                  ) : (
                    <h3>{`Srixon ${product.price2title} price`}</h3>
                  )}

                  <p>
                    {currencyFormat(product.euro2)} &euro;/{" "}
                    {currencyFormat(product.swiss2)} CHF /{" "}
                    {currencyFormat(product.kroner2)} SEK /{" "}
                    {currencyFormat(product.pound2)} &#163;
                  </p>
                </>
              )}
              {product.euro3 && (
                <>
                  {product.price3title == null ? (
                    <h3>{`Srixon ${product.productName} price`}</h3>
                  ) : (
                    <h3>{`Srixon ${product.price3title} price`}</h3>
                  )}

                  <p>
                    {currencyFormat(product.euro3)} &euro;/{" "}
                    {currencyFormat(product.swiss3)} CHF /{" "}
                    {currencyFormat(product.kroner3)} SEK /{" "}
                    {currencyFormat(product.pound3)} &#163;
                  </p>
                </>
              )}
              {product.euro4 && (
                <>
                  {product.price4title == null ? (
                    <h3>{`Srixon ${product.productName} price`}</h3>
                  ) : (
                    <h3>{`Srixon ${product.price4title} price`}</h3>
                  )}

                  <p>
                    {currencyFormat(product.euro4)} &euro;/{" "}
                    {currencyFormat(product.swiss4)} CHF /{" "}
                    {currencyFormat(product.kroner4)} SEK /{" "}
                    {currencyFormat(product.pound4)} &#163;
                  </p>
                </>
              )}
              {product.euro === null && (
                <p>In store in {product.availableWhen}</p>
              )}
            </div>
          </div>
        </>
      );
    });

  return (
    <div>
      <Helmet>
        <title>Srixon EU & UK Catalogue</title>
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
      </Helmet>
      <div className="category-title">
        {navBack}
        <div> {productTitle}</div>
        <Link to="/categories" className="nav-link">
          <img src={home} className="nav-icon-home" alt="Home" />{" "}
        </Link>
      </div>
      <div className="menu-placeholder" />
      <div>{productInfo}</div>
    </div>
  );
};

export const productQuery = graphql`
  query productQuery {
    allContentfulProduct(sort: { fields: index }) {
      nodes {
        productName
        productIntro {
          productIntro
        }
        new
        categorySlug
        colors
        availableWhen
        euro
        euro2
        euro3
        euro4

        headerImgs {
          file {
            url
          }
        }
        id
        index
        kroner
        kroner2
        kroner3
        kroner4

        new

        pound
        pound2
        pound3
        pound4

        productImage {
          file {
            url
          }
        }
        slug
        specs {
          file {
            url
          }
        }
        swiss
        swiss2
        swiss3
        swiss4

        price1title
        price2title
        price3title
        price4title

        techDescription1 {
          techDescription1
        }
        techDescription2 {
          techDescription2
        }
        techDescription3 {
          techDescription3
        }
        techDescription4 {
          techDescription4
        }
        techDescription5 {
          techDescription5
        }

        techImg1 {
          file {
            url
          }
        }
        techImg2 {
          file {
            url
          }
        }
        techImg3 {
          file {
            url
          }
        }
        techImg4 {
          file {
            url
          }
        }
        techImg5 {
          file {
            url
          }
        }
        techTitle1
        techTitle2
        techTitle3
        techTitle4
        techTitle5
      }
    }
  }
`;

ProductPage.Layout = Layout;
export default ProductPage;
