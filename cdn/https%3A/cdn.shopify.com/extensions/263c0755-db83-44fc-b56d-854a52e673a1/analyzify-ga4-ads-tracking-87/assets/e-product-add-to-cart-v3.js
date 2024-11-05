window.analyzify.initEProductAddtoCart = () => {
  window.analyzify.ga4atcEventFunc = function () {
    const formElement = analyzify.foundAtcElementForms[0];
    let variantInput = window.analyzify.product.variantInput;
    let productPrice = 0;
    let variantSku = "";
    let variantName = "";
    const singleProdArr = window.analyzify.singleProdInfos(window.analyzify.product.productJson);


    if (formElement) {
      const formVariantInput = Array.from(formElement.elements).find(
        (item) => item.name === "id"
      );
      variantInput = formVariantInput ? formVariantInput.value : variantInput;
    } else {
      const initialUrl = window.location.href;
      variantInput = initialUrl.includes("variant=")
        ? initialUrl.split("variant=")[1]
        : variantInput;
    }

    for (let i = 0; i < window.analyzify.product.productJson.variants.length; i++) {
      if (window.analyzify.product.productJson.variants[i].id == variantInput) {
        singleProdArr[0].item_variant_id = variantInput;
        singleProdArr[0].price = window.analyzify.product.productJson.variants[i].price / 100;
        singleProdArr[0].item_sku = window.analyzify.product.productJson.variants[i].sku;
        singleProdArr[0].item_variant =
        window.analyzify.product.productJson.variants[i].public_title ||
        window.analyzify.product.productJson.variants[i].title;
        singleProdArr[0].id =  window.analyzify.adsIdFormat(
          (item_id = singleProdArr[0].item_id || null),
          (item_variant_id =
            singleProdArr[0].item_variant_id || null),
          (item_sku = singleProdArr[0].item_sku || null)
        );
        break;
      }
    }
    const prodQty = analyzify.findQuantity() || 1;
    const ecommerce = {
      currency: window.analyzify.detectedCart.currency,
      value: parseFloat((singleProdArr[0].price * prodQty).toFixed(2)),
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
        revenue_value: window.analyzify.product.revenue_value * prodQty,
        currency: window.analyzify.detectedCart.currency,
      });
    }
    if (analyzify.properties.PINTEREST.tracking) {
      //pintrk('setconsent', true);
      pintrk("track", "AddToCart", {
        value: window.analyzify.product.revenue_value * prodQty,
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
        value: window.analyzify.product.value * prodQty,
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
    if (analyzify.properties.FACEBOOK.tracking) {
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
    analyzify.log("Product ee_addToCart==>");
    analyzify.log(window.dataLayer);
  };
};
