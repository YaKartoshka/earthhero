window.analyzify.initEColAddtoCart = () => {
  window.analyzify.ga4collAtcEventFunc = function () {
    const formElement = analyzify.foundAtcElementForms[0];
    if (!formElement) {
      return analyzify.log("Parent form element not found for quick view atc");
    }
    const productId = formElement.querySelector(".pid")?.value;
    const possibleIDs = formElement
      .getAttributeNames()
      .flatMap((name) => formElement.getAttribute(name).match(/([0-9]+)/g))
      .filter(Boolean);
    const addedProduct = window.analyzify.collection.products.find((product) => {
      if (productId && product.id === Number(productId)) {
        return true;
      } else if (product.variants) {
        for (let i = 0; i < product.variants.length; i++) {
          if (possibleIDs.includes(product.variants[i].id.toString())) {
            return true;
          }
        }
      }
      return possibleIDs.includes(product.id.toString());
    });
    if (!addedProduct) {
      return analyzify.log(
        "Parent form element found but product id did not match"
      );
    }
    const singleProdArr = window.analyzify.singleProdInfos(addedProduct);

    const prodQty = analyzify.findQuantity() || 1;
    const ecommerce = {
      currency: window.analyzify.detectedCart.currency,
      value: Number.parseFloat(addedProduct.price / 100) * prodQty,
      analyzify_source: "lightweight",
      items: [
        {
          ...singleProdArr[0],
          index: 0,
          quantity: prodQty,
        },
      ],
    };
    gtag("event", "add_to_cart", {
      ...window.analyzify.sh_info_obj,
      ...ecommerce,
    });
    if (
      analyzify.properties.GADS.tracking &&
      analyzify.properties.GADS.conversions.add_to_cart.value != "null" &&
      analyzify.properties.GADS.conversions.add_to_cart.value != ""
    ) {
      gtag("event", "conversion", {
        send_to:
          analyzify.properties.GADS.id +
          "/" +
          analyzify.properties.GADS.conversions.add_to_cart.value,
        ...ecommerce,
      });
    }
    if (analyzify.properties.BING.tracking) {
      window.uetq = window.uetq || [];
      window.uetq.push("event", "", {
        event_category: "add_to_cart",
        revenue_value: Number.parseFloat(addedProduct.price / 100) * prodQty,
        currency: window.analyzify.detectedCart.currency,
      });
    }
    if (analyzify.properties.PINTEREST.tracking) {
      //pintrk('setconsent', true);
      pintrk("track", "AddToCart", {
        value: Number.parseFloat(addedProduct.price / 100) * prodQty,
        order_quantity: prodQty,
        currency: window.analyzify.detectedCart.currency,
        line_items: {
          product_name: singleProdArr[0].item_name,
          product_id: singleProdArr[0].item_id,
          product_price: singleProdArr[0].price,
          product_brand: singleProdArr[0].item_brand,
          product_category: singleProdArr[0].item_type,
        },
      });
    }
    if (
      analyzify.properties.X.tracking &&
      analyzify.properties.X.events.add_to_cart != "null" &&
      analyzify.properties.X.events.add_to_cart != ""
    ) {
      twq("event", analyzify.properties.X.events.add_to_cart, {
        value: Number.parseFloat(addedProduct.price / 100) * prodQty,
        currency: window.analyzify.detectedCart.currency,
        contents: [
          {
            content_type: singleProdArr[0].item_type,
            content_id: singleProdArr[0].item_sku,
            content_name: singleProdArr[0].item_name,
            content_price: singleProdArr[0].price,
            num_items: 1,
            content_group_id: singleProdArr[0].item_variant_id,
          },
        ],
      });
    }
    if (analyzify.properties.FACEBOOK.trackingg) {
      fbq("track", "AddToCart", {
        content_name: singleProdArr[0].item_name,
        content_type: "product_group",
        content_ids: [singleProdArr[0].item_id],
        value: singleProdArr[0].price,
        currency: window.analyzify.detectedCart.currency,
      });
    }
    if (analyzify.properties.CRITEO.tracking) {
      window.criteo_q.push({
        event: "addToCart",
        item: [
          {
            id: singleProdArr[0].item_id,
            price: singleProdArr[0].price,
            quantity: prodQty,
          },
        ],
      });
    }
    if (analyzify.properties.KLAVIYO.tracking) {
      var _learnq = _learnq || [];
      var item = {
        $value: singleProdArr[0].price * prodQty,
        AddedItemProductName: singleProdArr[0].item_name,
        AddedItemProductID: singleProdArr[0].item_id,
        AddedItemSKU: singleProdArr[0].item_sku,
        AddedItemURL: window.location.href,
        AddedItemPrice: singleProdArr[0].price,
        AddedItemQuantity: prodQty,
      };
      _learnq.push(["track", "Added to Cart", item]);
    }
    analyzify.log("Product ee_addToCart ==>");
    analyzify.log(window.dataLayer);
  };
};
