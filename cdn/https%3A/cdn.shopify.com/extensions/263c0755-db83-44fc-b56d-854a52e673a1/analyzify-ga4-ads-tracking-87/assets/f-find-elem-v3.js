window.analyzify.initFFindElem = () => {
  document.addEventListener("click", (event) => {
    let path = event.path || (event.composedPath && event.composedPath());
    const ga4_checkout_elem = window.findElemInPath(
      path,
      analyzify.checkout_btn_attributes
    );
    const ga4_rfc_elem = window.findElemInPath(
      path,
      analyzify.removefromcart_btn_attributes
    );
    if (window.analyzify.shopify_template == "product") {
      const ga4_atc_elem = window.findElemInPath(
        path,
        analyzify.addtocart_btn_attributes
      );
      const ga4_wishlist_elem = window.findElemInPath(
        path,
        analyzify.wishlist_btn_attributes
      );
    } else if (window.analyzify.shopify_template == "collection") {
      const ga4_col_prod_click_elem = window.findElemInPath(
        path,
        analyzify.collection_prod_click_attributes
      );
      const ga4_coll_atc_elem = window.findElemInPath(
        path,
        analyzify.collection_atc_attributes
      );
    } else if (window.analyzify.shopify_template == "search") {
      const ga4_search_prod_click_elem = window.findElemInPath(
        path,
        analyzify.search_prod_click_attributes
      );
    }

    if (window.analyzify.shopify_template == "product") {
      const ga4_atc_elem = window.findElemInPath(
        path,
        analyzify.addtocart_btn_attributes
      );
      const ga4_wishlist_elem = window.findElemInPath(
        path,
        analyzify.wishlist_btn_attributes
      );
      if (ga4_atc_elem !== null) {
        analyzify.ga4atcEventFunc();
      } else if (ga4_wishlist_elem !== null) {
        analyzify.ga4wishlistEventFunc();
      }
    } else if (window.analyzify.shopify_template == "collection") {
      const ga4_col_prod_click_elem = window.findElemInPath(
        path,
        analyzify.collection_prod_click_attributes
      );
      const ga4_coll_atc_elem = window.findElemInPath(
        path,
        analyzify.collection_atc_attributes
      );
      if (ga4_col_prod_click_elem !== null) {
        analyzify.ga4colProdClickFunc();
      } else if (ga4_coll_atc_elem !== null) {
        analyzify.ga4collAtcEventFunc();
      }
    } else if (window.analyzify.shopify_template == "search") {
      if (ga4_search_prod_click_elem !== null) {
        analyzify.ga4searchProdClickFunc();
      }
    }

    if (ga4_checkout_elem !== null) {
      analyzify.ga4checkoutEventFunc();
    } else if (ga4_rfc_elem !== null) {
      analyzify.ga4rfcEventFunc();
    } else {
      analyzify.log(
        "The clicked button/link was not a addtocart, removefromcart or checkout button."
      );
      analyzify.log(event);
    }
  });
};
