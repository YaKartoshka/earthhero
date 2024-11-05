window.analyzify.adsIdFormat = function (
  item_id = null,
  item_variant_id = null,
  item_sku = null
) {
  if (
    analyzify.properties.GADS.product_id_format == "product_id_" &&
    item_id !== null
  ) {
    return item_id.toString();
  } else if (
    analyzify.properties.GADS.product_id_format == "variant_id_" &&
    item_variant_id !== null
  ) {
    return item_variant_id.toString();
  } else if (
    analyzify.properties.GADS.product_id_format == "product_sku_" &&
    item_sku !== null
  ) {
    return item_sku.toString();
  } else {
    // Use item_variant_id instead of item_id for the last part of the string
    return `shopify_${analyzify.properties.GADS.feed_region}_${item_id}_${item_variant_id}`;
  }
}
  window.analyzify.singleProdInfos = function (product) {
    var prodInfos = [
      {
        item_id: product.id.toString(),
        item_name: product.title,
        item_brand: product.vendor || null,
        item_type: product.type || null,
        item_sku:
          product.variants && product.variants.length > 0
            ? product.variants[0].sku
            : product.sku || null,
        item_handle: product.handle,
        quantity: product.quantity || 1,
        item_variant:
          product.variants && product.variants.length > 0
            ? product.variants[0].title
            : product.variant_title || null,
        item_variant_id:
          product.variants && product.variants.length > 0
            ? product.variants[0].id.toString()
            : product.variant_id.toString() || null,
        price: Number.parseFloat(
          (product.variants && product.variants.length > 0
            ? product.variants[0].price
            : product.price) / 100
        ),
        id: window.analyzify.adsIdFormat(
          product.id || null,
          (product.variants && product.variants.length > 0
            ? product.variants[0].id
            : product.variant_id) || null,
          (product.variants && product.variants.length > 0
            ? product.variants[0].sku
            : product.sku) || null
        ),
        google_business_vertical: "retail",
      },
    ];
    return prodInfos;
  };
  window.analyzify.multipleProdInfos = function (products) {
    var prodInfos = products.map((product, i) => {
      if (product.title) {
        return {
          index: i + 1,
          item_brand: product.vendor || null,
          item_type: product.type || null,
          item_sku: product.variants[0].sku || product.sku || null,
          item_name: product.title,
          item_handle: product.handle,
          item_id: product.id.toString(),
          quantity: product.quantity || 1,
          price: Number.parseFloat(
            (product.variants[0].price * 0.01).toFixed(2)
          ),
          id: window.analyzify.adsIdFormat(
            (item_id = product.id || null),
            (item_variant_id =
              product.variant_id || product.variants[0].id || null),
            (item_sku = product.sku || null)
          ),
          item_variant:
            product.variants[0].title || product.variant_title || null,
          item_variant_id:
            product.variants[0].id.toString() || product.variant_id.toString(),
          business_vertical: "retail",
        };
      } else {
        return {
          index: i,
          item_name: "Unknown",
        };
      }
    });
    return prodInfos;
  };
  window.analyzify.multipleCartProdInfos = function (products) {
    var prodInfos = products.map((product, i) => {
      return {
        index: i + 1,
        item_brand: product.vendor || null,
        item_type: product.product_type || null,
        item_sku: product.sku || null,
        item_name: product.product_title || product.title,
        item_handle: product.handle,
        item_id: product.product_id.toString(),
        quantity: product.quantity,
        price: Number.parseFloat((product.price * 0.01).toFixed(2)),
        id: window.analyzify.adsIdFormat(
          (item_id = product.product_id || null),
          (item_variant_id = product.variant_id || null),
          (item_sku = product.sku || null)
        ),
        item_variant: product.variant_title || null,
        item_variant_id: product.variant_id.toString() || null,
        business_vertical: "retail",
      };
    });
    return prodInfos;
  };
  window.analyzify.findQuantity = function () {
    const foundQty = [];
    const findQty = (attrObj) => {
      foundQty.length = 0;
      for (const [key, value] of Object.entries(attrObj)) {
        const qtyEl = document.querySelector(`[${key}="${value}"]`);
        if (qtyEl && qtyEl.value) {
          foundQty.push(qtyEl.value);
        }
      }
    };
    findQty(analyzify.product_quantity);
    const prodQty = foundQty.length > 0 ? foundQty[0] : 1;
    return Number(prodQty);
  };
  function analyzify_getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  window.getCookieValue = function (cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  window.getClientId = async function (measurementId) {
    var gaCookie = window.getCookieValue("_ga");
    if (gaCookie) {
      var clientIdMatch = gaCookie.match(/GA\d+.\d+.(\d+.\d+)/);
      if (clientIdMatch) {
        const clientId = clientIdMatch[1];
        analyzify.log("cid found --> cookie");
        return clientId;
      }
    }
    if (window.gtag) {
      const clientId = await new Promise((resolve) => {
        window.gtag("get", measurementId, "client_id", resolve);
      }).then((clientId) => clientId);
      analyzify.log("cid found --> gtag");
      return clientId;
    } else analyzify.log("ERROR: cid not found -->");
  };
  window.getSessionId = async function (measurementId) {
    function gtag() {
      dataLayer.push(arguments);
    }
    var gaCookie = window.getCookieValue(`_ga_${measurementId.substring(2)}`);
    analyzify.log(gaCookie);
    var sessionId = gaCookie ? gaCookie.match(/GS1.1.(\d+)./)[1] : null;
    if (sessionId) {
      analyzify.log("sess_id found --> cookie");
      return sessionId;
    }
    if (window.gtag) {
      sessionId = await new Promise((resolve) => {
        window.gtag("get", measurementId, "session_id", resolve);
      }).then((sessionId) => sessionId);
      analyzify.log("sess_id found --> gtag");
      return sessionId;
    }
    analyzify.log("ERROR: sess_id not found");
  };
  window.analyzify_updateCartAttributes = async function (attributes) {
    const url = "/cart/update.json";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attributes,
      }),
    })
      .then((response) => {
        if (response.ok) {
          analyzify.log("ERROR: Analyzify cart data updates sent.");
        } else {
          analyzify.log(
            "ERROR: Analyzify cart data updates could not be sent."
          );
        }
      })
      .catch((error) => {
        analyzify.log(error);
      });
  };
  window.analyzify_checksendcartdata = async function () {
    const measurementId = window.analyzify.properties.GA4.id;
    const clientId = await window.getClientId(measurementId);
    const sessionId = await window.getSessionId(measurementId);
    const fbp = window.getCookieValue("_fbp");
    const fbc = window.getCookieValue("_fbc");
    let gclid = analyzify_getQueryParam("gclid");
    let fbclid = analyzify_getQueryParam("fbclid");
    let utm_source = analyzify_getQueryParam("utm_source");
    let utm_medium = analyzify_getQueryParam("utm_medium");
    let utm_campaign = analyzify_getQueryParam("utm_campaign"); // Yeni eklenen satır
    let utm_content = analyzify_getQueryParam("utm_content"); // Yeni eklenen satır
    let utm_id = analyzify_getQueryParam("utm_id"); // Yeni eklenen satır
    let utm_term = analyzify_getQueryParam("utm_term"); // Yeni eklenen satır
    let source, medium;
    if (utm_source && utm_medium) {
      source = utm_source;
      medium = utm_medium;
    } else if (fbclid) {
      source = "facebook";
      medium = "paid";
    } else if (gclid) {
      source = "google";
      medium = "cpc";
    } else {
      analyzify.log("utm_source and utm_medium parameters not found.");
    }
    const attributes = {};
    //Google Ids
    if (clientId) {
      attributes["azfy_ga"] = clientId;
    }
    if (gclid) {
      attributes["azfy_gclid"] = gclid;
    }
    if (sessionId) {
      attributes[[`azfy_ga_${measurementId.substring(2)}`]] = sessionId;
    }
    //UTMs
    if (source) {
      attributes["azfy_utm_source"] = source;
    }
    if (medium) {
      attributes["azfy_utm_medium"] = medium;
    }
    if (utm_campaign) {
      attributes["azfy_utm_campaign"] = utm_campaign;
    } // Yeni eklenen satır
    if (utm_content) {
      attributes["azfy_utm_content"] = utm_content;
    } // Yeni eklenen satır
    if (utm_id) {
      attributes["azfy_utm_id"] = utm_id;
    } // Yeni eklenen satır
    if (utm_term) {
      attributes["azfy_utm_term"] = utm_term;
    } // Yeni eklenen satır
    //Facebook
    if (fbp) {
      attributes["azfy_fbp"] = fbp;
    }
    if (fbc) {
      attributes["azfy_fbc"] = fbc;
    }
    window.analyzify_updateCartAttributes(attributes);
  };
  window.analyzify.GetClickedProductPosition = function (elementHref, sku) {
    if (sku != "") {
      let collectionProducts = window.analyzify.collection.products;
      for (let i = 0; i < collectionProducts.length; i++) {
        let product = collectionProducts[i];
        let collectionProductsSku =
          product.variants[0].sku.replace(/['"]/g, "");
        if (sku === collectionProductsSku) {
          return i + 1;
        }
      }
      return 0;
    } else {
      var elementIndex = -1;
      collectionProductsElements = document.querySelectorAll(
        'main a[href*="/products/"]'
      );
      let hrefValues = [];
      let uniqueCollectionProductsElements = [];
      collectionProductsElements.forEach((element) => {
        let href = element.getAttribute("href");
        if (!hrefValues.includes(href)) {
          uniqueCollectionProductsElements.push(element);
          hrefValues.push(href);
        }
      });
      uniqueCollectionProductsElements.forEach(function (element, index) {
        if (element.href.includes(elementHref)) {
          elementIndex = index + 1;
        }
      });
      return elementIndex;
    }
  };
  window.findElemInPath = function (pathArray, attributeObj) {
    let buttonFound = null;
    if (pathArray) {
      // Loop through the path array
      for (let i = 0; i < pathArray.length; i++) {
        // Loop through the attribute object
        for (const attribute in attributeObj) {
          if (attributeObj.hasOwnProperty(attribute)) {
            const attributeName = attribute;
            const attributeValues = attributeObj[attribute];
            if (
              pathArray[i].hasAttribute !== undefined &&
              pathArray[i].hasAttribute(attributeName) === true
            ) {
              // Loop through the attribute values
              attributeValues.forEach(function (selectedValue) {
                // Check if the current path element's attribute contains the selected value
                if (
                  pathArray[i]
                    .getAttribute(attributeName)
                    .indexOf(selectedValue) > -1
                ) {
                  analyzify.log(
                    `${selectedValue} found in ${attributeName} attribute list.`
                  );
                  buttonFound = pathArray[i];
                  analyzify.foundElements.push(pathArray[i]);
                  analyzify.foundAtcElementForms.push(
                    pathArray[i].closest("form[action='/cart/add']")
                  );
                  analyzify.foundBoostElements.push(
                    pathArray[i].closest(".boost-pfs-filter-product-item")
                  );
                }
              });
            }
          }
        }
      }
    }
    return buttonFound;
  };
  // end of the function

