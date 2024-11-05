window.analyzify.initEProductAddtoWishlist = () => {
  window.analyzify.ga4wishlistEventFunc = function () {
    const initialUrl = window.location.href;
    let variantInput = window.analyzify.product.variantInput;

    if (initialUrl.includes("variant=")) {
      variantInput = initialUrl.split("variant=")[1];
    }

    const selectedVariant = window.analyzify.product.productJson.variants.find(
      (variant) => variant.id === variantInput
    );
    const {
      price: productPrice,
      sku: variantSku,
      public_title: variantName = "",
    } = selectedVariant || {};

    gtag("event", "add_to_wishlist", {
      ...window.analyzify.sh_info_obj,
      currency: window.analyzify.detectedCart.currency,
      value: window.analyzify.product.value,
      analyzify_source: "lightweight",
      items: [
        {
          ...singleProdArr[0],
          index: 0,
          item_category: ga4collectionTitle,
          quantity: 1,
        },
      ],
    });

    analyzify.log("Product ee_addToWishlist==>");
    analyzify.log(window.dataLayer);
  };
};
