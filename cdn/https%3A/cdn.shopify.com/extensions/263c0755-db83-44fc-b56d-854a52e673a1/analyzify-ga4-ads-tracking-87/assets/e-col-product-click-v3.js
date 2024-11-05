window.analyzify.initEColProductClick = () => {
  window.analyzify.ga4colProdClickFunc = function () {
    function clickedEvent(foundProd) {
      const singleProdArr = window.analyzify.singleProdInfos(foundProd);
      gtag("event", "select_item", {
        ...window.analyzify.sh_info_obj,
        currency: window.analyzify.detectedCart.currency,
        item_list_id: window.analyzify.collection.id,
        item_list_name: window.analyzify.collection.title,
        value: Number.parseFloat(foundProd.price / 100),
        analyzify_source: "lightweight",
        items: [
          {
            ...singleProdArr[0],
            index: analyzify.GetClickedProductPosition(
              href,
              foundProd.variants[0].sku
            ),
            quantity: 1,
          },
        ],
      });
    }
    if (analyzify.foundElements[0].hasAttribute("href")) {
      var href = analyzify.foundElements[0].getAttribute("href");
      if (href.includes("/products/")) {
        var handle = href.split("/products/")[1];
        var clickedProduct = window.analyzify.collection.products.find(function (product) {
          return product.handle === handle;
        });
        if (!clickedProduct) {
          return analyzify.log(
            "Clicked product does not found in collection product list"
          );
        }
        clickedEvent(clickedProduct);
      } else {
        analyzify.log(
          "Found element`s href does not include a product handle."
        );
      }
    } else if (analyzify.foundBoostElements[0].hasAttribute("data-id")) {
      var prodId = Number(
        analyzify.foundBoostElements[0].getAttribute("data-id")
      );
      var clickedProduct = window.analyzify.collection.products.find(function (product) {
        return product.id === prodId;
      });
      if (!clickedProduct) {
        return analyzify.log(
          "Clicked product does not found in collection product list"
        );
      }
      clickedEvent(clickedProduct);
    } else {
      analyzify.log(
        "Found element does not have an href or data-id attribute."
      );
    }
  };
  analyzify.ga4CollectionPageHandle();
};
