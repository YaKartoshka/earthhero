window.analyzify.initECartView = () => {
  window.analyzify.cartPageHandle = async function () {
    const viewCart = async function () {
      const cartObj = await fetch("/cart.js")
        .then(function (response) {
          return response.json();
        })
        .catch(function (e) {
          analyzify.log(e);
        });

      const multipleProdsArr = analyzify.multipleCartProdInfos(cartObj.items);

      let items = [];
      let criteo_prods = [];
      multipleProdsArr.forEach((product) => {
        items.push(product);
        criteo_prods.push({
          id: product.item_id,
          price: product.price,
          quantity: product.quantity,
        });
      });
      const ecommerce = {
        currency: window.analyzify.detectedCart.currency,
        value: parseFloat(Number(cartObj.total_price * 0.01).toFixed(2)),
        total_quantity: Number(cartObj.item_count),
        total_item: items.length,
        analyzify_source: "lightweight",
        items: items,
      };
     

      gtag("event", "view_cart", {
        ...window.analyzify.sh_info_obj,
        ...ecommerce,
      });
      if (
        analyzify.properties.GADS.tracking &&
        analyzify.properties.GADS.conversions.view_cart.value != "null" &&
        analyzify.properties.GADS.conversions.view_cart.value != ""
      ) {
        gtag("event", "conversion", {
          send_to:
            analyzify.properties.GADS.id +
            "/" +
            analyzify.properties.GADS.conversions.view_cart.value,
          ...ecommerce,
        });
      }
      if (analyzify.properties.CRITEO.tracking) {
        window.criteo_q.push({ event: "viewBasket", item: criteo_prods });
      }
    };
    viewCart();
  };
  analyzify.cartPageHandle();
};
