import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

const IndexPage = () => {
  // useEffect(() => {
  //   setTimeout(function () {
  //     window.location.href = "./categories";
  //   }, 1000);
  // });
  return (
    <>
      <Helmet>
        <title>Srixon Golf EU & UK Catalogue</title>
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
      </Helmet>
      <div className="loading-page">
        <div class="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

IndexPage.Layout = Layout;
export default IndexPage;
