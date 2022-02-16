import React from "react";
import { Link, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import home from "../images/home.png";
import back from "../images/back.png";

import ballMatrix from "../images/Golf-Ball-MATRIX-v3.jpg";
import customShafts from "../images/custom.jpg";

import Layout from "../components/Layout";

import "../styles/categories.css";

import golfBallMatrix from "../images/EN_SRX Ball Matrix_2022_A4 portrait.pdf";
import customShaftsPDF from "../images/Custom-Shafts-v2.pdf";

const CategoryPage = (props) => {
  let categories = props.data.allContentfulMenuItem.nodes;
  let accessoiresSubs = props.data.allContentfulAccessoiresSubCategory.nodes;
  let products = props.data.allContentfulProduct.nodes;
  let slug = props.params.slug;

  const categoryTitle = categories
    .filter((category) => category.category === slug)
    .map((category) => {
      return (
        <div key={category.id}>
          <h1>{category.categoryTitle}</h1>
        </div>
      );
    });

  const categoryInfo = categories
    .filter((category) => category.category === slug)
    .map((category) => {
      return (
        <div key={category.id}>
          <img
            className="category-info-image"
            src={category.categoryImage.file.url}
            alt={category.categoryImageAlt}
          />
          <div className="padding">
            {category.categoryUnderTitle ? (
              <h2>{category.categoryUnderTitle}</h2>
            ) : null}
            {category.categoryIntroText ? (
              <p className="category-intro-text">
                {category.categoryIntroText.categoryIntroText}
              </p>
            ) : null}
          </div>
        </div>
      );
    });

  const accessoiresSubsList = accessoiresSubs.map((accessoiresSub) => {
    return (
      <Link to={accessoiresSub.slug} key={accessoiresSub.id}>
        <div
          className="accessoires-sub"
          style={{
            backgroundImage: `url(${accessoiresSub.categoryImage.file.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <h2 className="category-list-title">
            {accessoiresSub.categoryTitle}
          </h2>
        </div>
      </Link>
    );
  });

  const productList = products
    .filter((product) => product.categorySlug === slug)
    .map((product) => {
      return (
        <Link to={product.slug} key={product.id} className="product-listing">
          <img
            className="product-list-image"
            src={product.productImage.file.url}
            alt={product.productImageAlt}
          />

          <div className="product-list-title">
            <p>
              {product.new ? <p className="new">new!</p> : null}
              <p className="product-name">{product.productName}</p>
            </p>
          </div>
        </Link>
      );
    });

  return (
    <>
      <Helmet>
        <title>Srixon EU & UK Catalogue</title>
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
      </Helmet>
      <div className="category-title">
        <Link to="/categories" className="nav-link">
          <img src={back} className="nav-icon-back" />
        </Link>
        <div> {categoryTitle}</div>
        <Link to="/categories" className="nav-link">
          <img src={home} className="nav-icon-home" />{" "}
        </Link>
      </div>
      <div className="menu-placeholder" />
      {slug === "accessoires" ? (
        <div>{accessoiresSubsList}</div>
      ) : (
        <>
          <div>{categoryInfo}</div>
          <div className="padding">
            <div className="product-list">
              {slug === "balls" ? (
                <a
                  href={golfBallMatrix}
                  target="blank"
                  className="product-listing"
                >
                  <img
                    className="product-list-image"
                    src={ballMatrix}
                    alt="Srixon Golf Ball Matrix"
                  />

                  <p className="product-list-title">Srixon Golf Ball Matrix</p>
                </a>
              ) : null}

              {productList}
              {slug === "clubs" ? (
                <a
                  href={customShaftsPDF}
                  target="blank"
                  className="product-listing"
                >
                  <img
                    className="product-list-image"
                    src={customShafts}
                    alt="Srixon Custom Shafts"
                  />

                  <p className="product-list-title">Custom Shafts</p>
                </a>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const categoryQuery = graphql`
  query categoryQuery {
    allContentfulMenuItem {
      nodes {
        id
        slug
        category
        categoryImageAlt
        categoryTitle
        categoryImage {
          file {
            url
          }
        }
        categoryUnderTitle
        categoryIntroText {
          categoryIntroText
        }
      }
    }

    allContentfulAccessoiresSubCategory(sort: { fields: index }) {
      nodes {
        id
        category
        categoryImage {
          file {
            url
          }
        }
        categoryImageAlt
        categoryTitle
        slug
        index
      }
    }

    allContentfulProduct(sort: { fields: index }) {
      nodes {
        id
        index
        new
        productName
        slug
        categorySlug
        productImage {
          file {
            url
          }
        }
      }
    }
  }
`;

CategoryPage.Layout = Layout;
export default CategoryPage;
