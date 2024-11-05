window.analyzify.initESearchProductClick = () => {
  window.analyzify.ga4searchProdClickFunc = function () {
    if (analyzify.foundElements[0].hasAttribute("href")) {
      var href = analyzify.foundElements[0].getAttribute("href");
      if (href.includes("/products/")) {
        var handle_0 = href.split("/products/")[1];
        var handle = handle_0.split("?")[0];

        var prodPosition;

        window.analyzify.search.results.forEach((product, i) => {
          if (handle == product.handle) {
            prodPosition = i + 1;
          }
        });

        var clickedProduct = searchResultsJson.filter(function (product) {
          return product.handle === handle;
        });

        if (clickedProduct.length == 0)
          return analyzify.log(
            "Clicked product does not found in search product list"
          );
        const singleProdArr = window.analyzify.singleProdInfos(
          clickedProduct[0]
        );

        gtag("event", "select_item", {
          ...window.analyzify.sh_info_obj,
          currency: window.analyzify.detectedCart.currency,
          value: clickedProduct[0].price / 100,
          analyzify_source: "lightweight",
          items: [
            {
              ...singleProdArr[0],
              index: prodPosition,
            },
          ],
        });
      } else {
        analyzify.log(
          "Found element`s href does not include an product handle."
        );
      }
    } else {
      analyzify.log("Found element does not have an href attribute.");
    }
  };
};
