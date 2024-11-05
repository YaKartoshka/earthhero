window.analyzify.appStartSection1 = () => {
  gtag("js", new Date());
  // GA4
  if (analyzify.properties.GA4.tracking) {
    gtag("config", window.analyzify.properties.GA4.id, {
      groups: "analyzify",
      send_page_view: false,
      analyzify_source: "lightweight",
      debug_mode: window.analyzify.debug,
    });
  }
  if (window.analyzify.properties.GADS.id) {
    gtag("config", window.analyzify.properties.GADS.id, {
      groups: "analyzify",
      debug_mode: window.analyzify.debug,
    });
  }
};

window.analyzify.appStartSection2 = () => {
  if (window.analyzify.op_cart_data_collection) {
    window.analyzify_checksendcartdata();
  }
  const detectedCart = window.analyzify.detectedCart;
  const detectedCurrency = detectedCart.currency;
  if (analyzify.properties.GA4.tracking) {
    if (window.analyzify.shopify_customer.type == "member") {
      gtag("set", "user_properties", {
        type: "member",
        id: window.analyzify.shopify_customer.id,
        last_order: window.analyzify.shopify_customer.last_order,
        orders_count: window.analyzify.shopify_customer.orders_count,
        total_spent: window.analyzify.shopify_customer.total_spent,
        email_sha256: window.analyzify.shopify_customer.email,
        email_sha1: window.analyzify.shopify_customer.email_sha1,
        email:
          analyzify.send_unhashed_email === true
            ? window.analyzify.shopify_customer.email
            : null,
      });
    } else if (window.analyzify.shopify_customer.type == "visitor") {
      gtag("set", "user_properties", {
        type: "visitor",
      });
    }
    gtag("event", "page_view", {
      send_to: "analyzify",
    });
  }
  const sh_info_obj = {
    send_to: "analyzify",
    content_type: window.analyzify.content_type,
    page_currency: detectedCurrency,
  };
  window.analyzify.sh_info_obj = sh_info_obj;
  if (analyzify.debug_mode) {
    sh_info_obj.debug_mode = true;
  }
};
