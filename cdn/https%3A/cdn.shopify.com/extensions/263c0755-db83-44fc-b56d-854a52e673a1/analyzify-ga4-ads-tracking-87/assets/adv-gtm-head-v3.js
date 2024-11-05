window.analyzify.initAdvGtmHead = () => {
  if (
    window.analyzify.properties.GTM.status !== "false" &&
    window.analyzify.properties.GTM.status !== false
  ) {
    const gtmUrl = window.analyzify.gtm_src || "https://www.googletagmanager.com";
  
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = gtmUrl + "/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(
      window,
      document,
      "script",
      "dataLayer",
      window.analyzify.properties.GTM.id
    );
  }

  window.analyzify = {
    ...analyzify,
    analyzify_version: "3.3", // Analyzify version information
    integration_method: "advanced",
    pageFly: window.analyzify.pageFly, // Set this to true if you are using PageFly in your website
   
    // In this section, we are adding eventListeners for add-to-cart functionality for stores using customizable products with relevant applications.
    global_atc_functions: ["pplrAddToCartCompleted"],
    rebuy_atc_rfc: window.analyzify.rebuy_atc_rfc,
  };
  if (window.analyzify.privacy_api) {
    window.analyzify.initCookiebotApi();
  }
};
