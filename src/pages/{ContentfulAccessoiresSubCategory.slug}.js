import React from "react";
import { Link, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import home from "../images/home.png";
import back from "../images/back.png";

import Layout from "../components/Layout";
import Consent from "../components/Consent";

import "../styles/categories.css";

const SubCategoryPage = (props) => {
  let accessoiresSubs = props.data.allContentfulAccessoiresSubCategory.nodes;
  let products = props.data.allContentfulProduct.nodes;
  let slug = props.params.slug;

  const categoryTitle = accessoiresSubs
    .filter((category) => category.category === slug)
    .map((category) => {
      return (
        <div key={category.id}>
          <h1>{category.categoryTitle}</h1>
        </div>
      );
    });

  const categoryInfo = accessoiresSubs
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

  const accessoiresList = accessoiresSubs.map((accessoiresSub) => {
    return (
      <Link
        to={accessoiresSub.slug}
        key={accessoiresSub.id}
        className="category-list-link"
        style={{
          backgroundImage: `url(${accessoiresSub.categoryImage.file.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "20vh",
        }}
      >
        <h2 className="category-list-title">{accessoiresSub.categoryTitle}</h2>
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

  const standBagList = products
    .filter(
      (product) =>
        product.categorySlug === slug && product.cartStand === "stand"
    )
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

  const cartBagList = products
    .filter(
      (product) => product.categorySlug === slug && product.cartStand === "cart"
    )
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
      <Consent />
      <div className="category-title">
        <Link to="/accessoires" className="nav-link">
          <img src={back} className="nav-icon-back" />
        </Link>
        <div> {categoryTitle}</div>
        <Link to="/categories" className="nav-link">
          <img src={home} className="nav-icon-home" />{" "}
        </Link>
      </div>
      <div className="menu-placeholder" />
      {slug === "accessoires" ? (
        <>
          <div>{categoryInfo}</div>
          <div>{accessoiresList}</div>
        </>
      ) : null}
      {slug === "golf-bags" ? (
        <>
          <div>{categoryInfo}</div>
          <h2 class="category-sub-list-title">Cart Bags</h2>

          <div className="padding">
            <div className="product-list">{cartBagList}</div>
          </div>
          <h2 class="category-sub-list-title">Stand Bags</h2>
          <div className="padding">
            <div className="product-list">{standBagList}</div>
          </div>
        </>
      ) : null}
      {slug !== "golf-bags" && slug !== "accessoires" ? (
        <>
          <div>{categoryInfo}</div>
          <div className="padding">
            <div className="product-list">{productList}</div>
          </div>
        </>
      ) : null}
    </>
  );
};

export const categoryQuery = graphql`
  query subCategoryQuery {
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
        cartStand
        productImage {
          file {
            url
          }
        }
      }
    }
  }
`;

SubCategoryPage.Layout = Layout;
export default SubCategoryPage;
