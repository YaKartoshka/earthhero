window.analyzify = {
  ...window.analyzify,
  logs: [], // An array to store log messages
  stopAtLog: false, // Set this to true if you want to use a debugger while logging
  // Modify the following button attributes if you do not see any ee_addToCart datalayer event when you click add to cart button in any product detail page.
  addtocart_btn_attributes: {
    type: ["submit"],
    name: ["add-to-cart", "add"],
    "data-add-to-cart-text": ["Add to Cart"],
    class: [
      "addtocart-button",
      "pdp-form--atc-button",
      "button-add",
      "add-to-cart",
      "add_to_cart",
      "buttonAddtoCart",
      "product-form__add-to-cart",
      "gtmatc",
      "product-form__cart-submit",
      "AddToCartText",
      "AddToCart",
      "AddToCart-product-template",
      "product__add-to-cart",
      "single_add_to_cart_button",
      "js_frm_cart",
      "product-buy-buttons--cta",
      "jsfrmcart",
      "product-buy-buttons--cta",
    ],
    id: ["AddToCart"],
  },
  wishlist_btn_attributes: {
    class: ["test-wishlist"],
  },
  // Modify the following element attribute if you see that quantity being pushed to datalayer is wrong when you try to add the a product to the cart with more than 1 as quantity.
  product_quantity: {
    name: ["quantity"],
  },
  // Modify the following button attributes if you do not see any ee_removeFromCart datalayer event when you remove any item from the cart in the cart page.
  removefromcart_btn_attributes: {
    "data-remove-item": ["cart-template"],
    "data-cart-remove": ["Remove"],
    "aria-label": ["Remove"],
    class: [
      "cart__remove-btn",
      "cart__remove",
      "cart__removee",
      "cart-item__remove",
      "item-remove",
      "remove",
      "rebuy-cart__flyout-item-remove",
      "cart_ac_remove",
      "cartacremove",
      "previewCartItem-remove",
      "cart-remove",
      "btn-remove",
      "remove-product",
      "ajaxcart__qty-remove",
      "quick-cart__item-remove",
    ],
    id: ["CartDrawer-Remove"],
    href: ["/cart/change?id=", "/cart/change?line="],
  },
  // Modify the following button attributes if you do not see ee_checkout datalayer event when you click "checkout" button in the cart page or cart drawer.
  checkout_btn_attributes: {
    name: ["checkout"],
    class: [
      "upcart-checkout-button",
      "cart__submit",
      "checkout-trigger",
      "rebuy-cart__checkout-button",
      "button-checkout",
      "checkout-btn",
    ],
    href: ["/checkout"],
    id: ["CartDrawer-Checkout"],
    value: ["Checkout"],
  },
  // Modify the following button attributes if you do not see any ee_productClick datalayer event when you click to a product in collection pages.
  collection_prod_click_attributes: {
    href: ["/products/"],
    class: ["boost-pfs-addtocart-select-options"],
  },
  // Modify the following button attributes if you do not see any ee_addToCart datalayer event when you click add to cart button in any collection pages.
  collection_atc_attributes: {
    name: ["add"],
    class: [
      "add-to-cart-btn",
      "hit-buy-button",
      "product-form__cart-submit",
      "spf-product__form-btn-addtocart",
      "add-to-cart",
      "boost-pfs-addtocart-btn",
      "js_addtc",
      "pratc",
    ],
    type: ["submit"],
    "aria-label": ["Add to cart"],
    id: ["product-add-to-cart"],
  },
  header_nav_btn_attributes: {
    class: ["header-shortlink", "header__menu-item"],
    id: [],
  },
  disclosure_attributes: {
    class: ["disclosure__link"],
  },
  accordion_summary_attributes: {
    class: ["accordion__title", "accordion"],
  },
  hero_banner_area_attributes: {
    class: [
      "banner__box",
      "banner__column-inner banner__column-inner--hero banner__column-inner--hero-large",
    ],
  },
  hero_banner_title_attributes: {
    class: [
      "banner__heading",
      "content__title content__title--hero content__title--hero-large",
    ],
  },
  hero_banner_subtitle_attributes: {
    class: [
      "content__subtitle content__subtitle--hero content__subtitle--hero-large",
    ],
  },
  hero_banner_cta_attributes: {
    class: [
      "content__buttons content__buttons--hero content__buttons--hero-large",
    ],
  },
  // Modify the following button attributes if you do not see any ee_productClick datalayer event when you click to a product in search result pages.
  search_prod_click_attributes: {
    href: ["/products/"],
  },
  foundElements: [],
  foundAtcElementForms: [],
  foundBoostElements: [],
};

let each_element;
let custom_classes = window.analyzify.custom_classes;
if (
  custom_classes != "" &&
  custom_classes != "null" &&
  custom_classes != undefined
) {
  if (custom_classes.includes(",")) {
    each_element = custom_classes.split(",");
  } else {
    custom_classes = custom_classes + ",";
    each_element = custom_classes.split(",");
  }
  for (var i = 0; i < each_element.length; i++) {
    if (each_element[i].includes(":")) {
      var aClass = each_element[i].split(":");
      if (aClass[0] == "delete") {
        if (analyzify.hasOwnProperty(aClass[1])) {
          if (analyzify[aClass[1]].hasOwnProperty(aClass[2])) {
            if (analyzify[aClass[1]][aClass[2]].includes(aClass[3])) {
              var ind = analyzify[aClass[1]][aClass[2]].indexOf(aClass[3]);
              analyzify[aClass[1]][aClass[2]].splice(ind, 1);
            }
          }
        }
      } else if (analyzify.hasOwnProperty(aClass[0])) {
        if (analyzify[aClass[0]].hasOwnProperty(aClass[1])) {
          if (!analyzify[aClass[0]][aClass[1]].includes(aClass[2])) {
            analyzify[aClass[0]][aClass[1]].push(aClass[2]);
          }
        } else {
          analyzify[aClass[0]][aClass[1]] = [];
          analyzify[aClass[0]][aClass[1]].push(aClass[2]);
        }
      }
    }
  }
}
analyzify.log = function (t) {
  if (window.analyzify.logging && t != null) {
    console.log(`** Analyzify Logger: ${typeof t === "object" ? "\n" : ""}`, t);
    analyzify.logs.push(t);
    if (analyzify.stopAtLog) {
      debugger;
    }
  }
};

