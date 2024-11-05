
window.analyzify = {
  ...analyzify,
  analyzify_version: "1.1", // Analyzify version information
  integration_method: "lightweight", // Integration method
  debug_mode: window.analyzify.debug,
  consent_mode: {
    status: window.analyzify.gcm_default, // true = consent_mode is activated
    state: window.analyzify.consent_state
  },
};
function gtag() {
  dataLayer.push(arguments);
}

if ( window.analyzify.gdpr_compliance && window.analyzify.cookiebot_status || (window.analyzify.cookiebot_id != "" && window.analyzify.cookiebot_id != undefined && window.analyzify.cookiebot_id != "null" && window.analyzify.cookiebot_id != null
)) {
  gtag("consent", "default", {
    ad_storage: analyzify.consent_mode.state == true ? "granted" : "denied",
    analytics_storage:
      analyzify.consent_mode.state == true ? "granted" : "denied",
    ad_personalization:
      analyzify.consent_mode.state == true ? "granted" : "denied",
    ad_user_data: analyzify.consent_mode.state == true ? "granted" : "denied",
    wait_for_update: 500,
  });
  gtag("set", { url_passthrough: true, ads_data_redaction: false });
}
  if (
    window.analyzify.properties.GA4.tracking &&
    window.analyzify.properties.GA4.id != "" &&
    window.analyzify.properties.GA4.id != undefined &&
    window.analyzify.properties.GA4.id != null &&
    window.analyzify.properties.GA4.id != "null"
  ) {

    const script = document.createElement("script");
    
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${window.analyzify.properties.GA4.id}`;
    document.head.appendChild(script);
  } else if (
    window.analyzify.properties.GADS.remarketing &&
    window.analyzify.properties.GADS.id != "" &&
    window.analyzify.properties.GADS.id != undefined &&
    window.analyzify.properties.GADS.id != null &&
    window.analyzify.properties.GADS.id != "null"
  ) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${window.analyzify.properties.GADS.id}`;
    document.head.appendChild(script);
  }

if (
  (window.analyzify.gdpr_compliance &&
    window.analyzify.cookiebot_status == "active") ||
  (window.analyzify.cookiebot_id != "" &&
    window.analyzify.cookiebot_id != undefined &&
    window.analyzify.cookiebot_id != "null" &&
    window.analyzify.cookiebot_id != null)
) {
  window.analyzify.initCookiebotCmp();
}
