window.analyzify.initAdvGtmBody = () => {
  window.analyzify.Initialize = function () {
    window.analyzify.loadScript = function (callback) {
      callback();
    };
    window.analyzify.AppStart = function () {
      if (window.analyzify.op_cart_data_collection) {
        window.analyzify_checksendcartdata();
      }
      const detectedCart = window.analyzify.detectedCart;
      const detectedCurrency = detectedCart.currency;
      window.analyzify.detectedCurrency = detectedCart.currency;
      const templateName = window.analyzify.shopify_template || "other";
      const pushedPage =
        templateName === "index"
          ? "Homepage"
          : window.analyzify.shopify_template;
      let user = {};
      if (window.analyzify.shopify_customer.type == "member") {
        user = {
          type: "member",
          id: window.analyzify.shopify_customer.id,
          first_name: window.analyzify.shopify_customer.first_name,
          last_name: window.analyzify.shopify_customer.last_name,
          last_order: window.analyzify.shopify_customer.last_order,
          orders_count: window.analyzify.shopify_customer.orders_count,
          total_spent: window.analyzify.shopify_customer.total_spent,
          email_sha256: window.analyzify.shopify_customer.email,
          email_sha1: window.analyzify.shopify_customer.email_sha1,
          email:
            analyzify.send_unhashed_email === true
              ? window.analyzify.shopify_customer.email
              : null,
          marketing: window.analyzify.shopify_customer.marketing,
        };
      } else {
        user = {
          type: "visitor",
        };
      }

      const sh_info_obj = {
        event: "sh_info",
        page_type: pushedPage,
        page_currency: detectedCurrency,
        page_id: Date.now(),
        analyzify_source: "advanced",
        implementation_type: "extension",
        user: user,
      };
      window.analyzify.sh_info_obj = sh_info_obj;
      window.dataLayer.push(sh_info_obj);
      let multipleProdsArr;
      if (window.analyzify.shopify_template == "collection") {


        const collectionTitle =
          window.analyzify.collection != ""
            ? window.analyzify.collection
            : null;
        const collectionId =
          window.analyzify.collection.id != ""
            ? window.analyzify.collection.id
            : null;
        const collectionHandle =
          window.analyzify.collection.handle != ""
            ? window.analyzify.collection.handle
            : null;


      } else if (window.analyzify.shopify_template == "search") {
        const searchTerm = window.analyzify.search.terms;
        const searchResults = window.analyzify.search.count;
        const searchResultsJson = window.analyzify.search.results;
        return (multipleProdsArr =
          window.analyzify.multipleProdInfos(window.analyzify.search.results));
      } else if (window.analyzify.shopify_template == "product") {
        const productJson = window.analyzify.product.productJson;
        const collectionTitle =
          window.analyzify.product.collectionTitle != ""
            ? window.analyzify.product.collectionTitle
            : null;
        const collectionId =
          window.analyzify.product.collectionId != ""
            ? window.analyzify.product.collectionId
            : null;
        const collectionHandle =
          window.analyzify.product.collectionHandle != ""
            ? window.analyzify.product.collectionHandle
            : null;
        const singleProdArr = window.analyzify.singleProdInfos(
          window.analyzify.product.productJson
        );
        const variantInvQuantity = window.analyzify.variantInvQuantity;
        const productAvailable = window.analyzify.product.available;
        const variantAvailable = window.analyzify.product.variantAvailable;
        const variantCount =
          window.analyzify.product.productJson.variants.length;
        let availableVariantCount = 0;
        let totalAvailableQuantity = 0;
        window.analyzify.product.productJson.variants.forEach((variant) => {
          if (variant.available) {
            availableVariantCount += 1;
            totalAvailableQuantity += variant.inventory_quantity;
          }
        });
        totalAvailableQuantity = totalAvailableQuantity || 0;
      }



      window.analyzify.CollectionPageHandle = function () {
        const multipleProdsArr = window.analyzify.multipleProdInfos(
          window.analyzify.collection.products
        )
        const collectionTitle =
          window.analyzify.collection.title != ""
            ? window.analyzify.collection.title
            : null;


        const collectionId =
          window.analyzify.collection.id != ""
            ? window.analyzify.collection.id
            : null;
        const collectionHandle =
          window.analyzify.collection.handle != ""
            ? window.analyzify.collection.handle
            : null;
        window.dataLayer.push({ ecommerce: null });
        let items = [];
        multipleProdsArr.forEach((product) => {
          items.push(product);
        });
        window.dataLayer.push({
          event: "ee_view_item_list",
          ecommerce: {
            item_list_id: collectionId,
            item_list_name: collectionTitle,
            analyzify_source: "advanced",
            implementation_type: "extension",
            items: items,
          },
        });
      };
      window.analyzify.SearchPageHandle = function () {
        window.dataLayer.push({ ecommerce: null });
        let items = [];
        const multipleProdsArr = window.analyzify.multipleProdInfos(window.analyzify.search.results)
        multipleProdsArr.forEach((product) => {
          items.push(product);
        });
        window.dataLayer.push({
          event: "ee_search",
          page_type: "search",
          search_term: searchTerm,
          search_results: searchResults,
          ecommerce: {
            item_list_id: null,
            item_list_name: `Search Results: ${searchTerm}`,
            analyzify_source: "advanced",
            implementation_type: "extension",
            items: items,
          },
        });
      };
      window.analyzify.ProductPageHandle = function () {
        const singleProdArr = window.analyzify.singleProdInfos(
          window.analyzify.product.productJson
        );
        window.dataLayer.push({ ecommerce: null });
        singleProdArr[0].item_variant =
          window.analyzify.product.variant_title != ""
            ? window.analyzify.product.variant_title
            : null;
        singleProdArr[0].item_variant_id =
          window.analyzify.product.variantInput != ""
            ? window.analyzify.product.variantInput
            : null;
        window.dataLayer.push({
          event: "ee_view_item",
          ecommerce: {
            currency: detectedCurrency,
            value: Number.parseFloat(window.analyzify.product.value.toFixed(2)),
            analyzify_source: "advanced",
            implementation_type: "extension",
            items: [
              {
                ...singleProdArr[0],
                index: 1,
              },
            ],
          },
        });
      };
      window.analyzify.cartPageHandle = async function () {
        window.dataLayer.push({ ecommerce: null });
        const viewCart = async function () {
          try {
            const cartObjRes = await fetch("/cart.js");
            const cartObj = await cartObjRes.json();
            const multipleProdsArr = analyzify.multipleCartProdInfos(
              cartObj.items
            );
            let items = [];
            multipleProdsArr.forEach((product) => {
              items.push({
                ...product,
                item_list_id: "cart",
                item_list_name: "Cart",
              });
            });
            window.dataLayer.push({
              event: "ee_view_cart",
              page_type: "cart",
              ecommerce: {
                currency: detectedCurrency,
                value: parseFloat((cartObj.total_price * 0.01).toFixed(2)),
                total_quantity: Number(cartObj.item_count),
                total_item: items.length,
                analyzify_source: "advanced",
                implementation_type: "extension",
                items: items,
              },
            });
          } catch (error) {
            analyzify.log(error);
          }
        };
        viewCart();
      };
      function createNavData(path, attributes, navTitle) {
        const nav_elem = window.findElemInPath(path, attributes);
        if (!nav_elem) {
          analyzify.log("No navigation element found.");
          return null;
        } // Return null if element is not found
        const tagName = nav_elem.tagName;
        const type =
          tagName === "A"
            ? "link"
            : tagName === "BUTTON"
              ? "button"
              : tagName === "NAV"
                ? "layer"
                : "text";
        const title = nav_elem.innerText.trim() || "";
        const url =
          tagName === "A"
            ? nav_elem.href
            : tagName === "NAV" || tagName === "DIV" || tagName === "BUTTON"
              ? nav_elem.closest("a")
                ? nav_elem.closest("a").href
                : undefined
              : undefined;
        return {
          event: "ee_navClick",
          nav: { position: navTitle, type, title, url },
        };
      }
      function pushNavData(path, attributes, navTitle) {
        const navData = createNavData(path, attributes, navTitle);
        if (navData !== null) {
          dataLayer.push(navData);
        }
      }
      document.addEventListener("click", (event) => {
        let path = event.path || (event.composedPath && event.composedPath());
        const checkout_elem = window.findElemInPath(
          path,
          analyzify.checkout_btn_attributes
        );
        const rfc_elem = window.findElemInPath(
          path,
          analyzify.removefromcart_btn_attributes
        );
        const header_nav_btn_elem = window.findElemInPath(
          path,
          analyzify.header_nav_btn_attributes
        );

        if (header_nav_btn_elem !== null) {
          pushNavData(path, analyzify.header_nav_btn_attributes, "header-nav");
        }
        const disclosure_elem = window.findElemInPath(
          path,
          analyzify.disclosure_attributes
        );
        if (disclosure_elem !== null) {
          // analyzify.log(disclosure_elem);
          dataLayer.push({
            event: "ee_disclosure_changed",
            data_value: disclosure_elem
              ? disclosure_elem.hasAttribute("data-value")
                ? disclosure_elem.getAttribute("data-value").trim()
                : null
              : null,
            selected_option: disclosure_elem
              ? disclosure_elem.textContent.replace(/\s+/g, " ").trim()
              : null,
            type: disclosure_elem
              .closest("form")
              .classList.contains("localization-form")
              ? "localization-form"
              : null,
          });
        }
        const accordion_summary_elem = window.findElemInPath(
          path,
          analyzify.accordion_summary_attributes
        );
        if (accordion_summary_elem !== null) {
          // analyzify.log(accordion_summary_elem);
          dataLayer.push({
            event: "ee_product_detail_accordion",
            title:
              accordion_summary_elem.textContent.replace(/\s+/g, " ").trim() ||
              null,
          });
        }
        const hero_banner_area_elem = window.findElemInPath(
          path,
          analyzify.hero_banner_area_attributes
        );
        if (hero_banner_area_elem !== null) {
          const allChildren = Array.from(hero_banner_area_elem.children);
          const targetChild = allChildren.find((sibling) => {
            const titleElement = window.findElemInPath(
              Array.from(sibling.children).flatMap((child) =>
                Array.from(child.children)
              ),
              analyzify.hero_banner_title_attributes
            );
            const subtitleElement = window.findElemInPath(
              Array.from(sibling.children).flatMap((child) =>
                Array.from(child.children)
              ),
              analyzify.hero_banner_subtitle_attributes
            );
            const ctaElement = window.findElemInPath(
              Array.from(sibling.children).flatMap((child) =>
                Array.from(child.children)
              ),
              analyzify.hero_banner_cta_attributes
            );
            const link = path.find(
              (element) =>
                (element.tagName === "A" || element.tagName === "BUTTON") &&
                element.href
            );
            if ((titleElement || subtitleElement) && link) {
              dataLayer.push({
                event: "ee_heroBannerClick",
                heading: titleElement
                  ? titleElement.textContent.trim().substring(0, 100)
                  : null,
                description: subtitleElement
                  ? subtitleElement.textContent.trim().substring(0, 100)
                  : null,
                cta_title:
                  ctaElement && link
                    ? ctaElement.textContent.trim().substring(0, 100)
                    : null,
                cta_url: link ? link.href : null,
              });
            }
            return titleElement || subtitleElement;
          });
        }

        if (window.analyzify.shopify_template == "product") {
          const atc_elem = window.findElemInPath(
            path,
            analyzify.addtocart_btn_attributes
          );
          const wishlist_elem = window.findElemInPath(
            path,
            analyzify.wishlist_btn_attributes
          );
        } else if (window.analyzify.shopify_template == "collection") {
          const col_prod_click_elem = window.findElemInPath(
            path,
            analyzify.collection_prod_click_attributes
          );
          const coll_atc_elem = window.findElemInPath(
            path,
            analyzify.collection_atc_attributes
          );
        } else if (window.analyzify.shopify_template == "search") {
          const search_prod_click_elem = window.findElemInPath(
            path,
            analyzify.search_prod_click_attributes
          );
        }

        if (window.analyzify.shopify_template == "product") {
          let atc_elem = window.findElemInPath(
            path,
            analyzify.addtocart_btn_attributes
          );
          if (atc_elem == null && analyzify.global_atc_functions.length) {
            analyzify.global_atc_functions.forEach(function (fname) {
              window.addEventListener(fname, function (e) {
                analyzify.atcEventFunc();
                analyzify.log("customized product added");
                analyzify.log(e);
                window.e = e;
              });
            });
          } else if (atc_elem !== null) {
            analyzify.atcEventFunc();
          } else if (wishlist_elem !== null) {
            analyzify.wishlistEventFunc();
          }
        } else if (window.analyzify.shopify_template == "collection") {
          const col_prod_click_elem = window.findElemInPath(
            path,
            analyzify.collection_prod_click_attributes
          );
          const coll_atc_elem = window.findElemInPath(
            path,
            analyzify.collection_atc_attributes
          );
          if (col_prod_click_elem !== null) {
            analyzify.colProdClickFunc();
          } else if (coll_atc_elem !== null) {
            analyzify.collAtcEventFunc();
          }
        } else if (window.analyzify.shopify_template == "search") {
          if (search_prod_click_elem !== null) {
            analyzify.searchProdClickFunc();
          }
        }
        if (checkout_elem !== null) {
          analyzify.checkoutEventFunc();
        } else if (rfc_elem !== null) {
          analyzify.rfcEventFunc();
        } else {
          analyzify.log(
            "The clicked button/link was not a addtocart, removefromcart or checkout button."
          );
          analyzify.log(event);
        }
      });
      if (analyzify.rebuy_atc_rfc) {
        const addToCartHandler = (event) => {
          window.dataLayer.push({ ecommerce: null });
          let item = event.detail.item;
          console.log(item)
          let productData = {
            event: "ee_add_to_cart",
            ecommerce: {
              currency: detectedCurrency,
              value: Number.parseFloat(
                ((item.price / 100) * item.quantity).toFixed(2)
              ),
              items: [
                {
                  item_id: item.product_id.toString(),
                  item_name: item.product_title.replace(/["']/g, ""),
                  item_brand: item.vendor,
                  item_category: item.product_type,
                  item_variant: item.variant_title,
                  variant_id: item.variant_id,
                  item_price: Number.parseFloat(item.price / 100),
                  sku: item.sku,
                  quantity: item.quantity,
                  item_handle: item.handle,
                },
              ],
            },
          };
          window.dataLayer.push(productData);
        };
        const removeFromCartHandler = (event) => {
          window.dataLayer.push({ ecommerce: null });
          let item = event.detail.product;
          let productData = {
            event: "ee_remove_from_cart",
            ecommerce: {
              currency: detectedCurrency,
              value: parseFloat(
                ((item.price / 100) * item.quantity).toFixed(2)
              ),
              items: [
                {
                  item_id: item.product_id.toString(),
                  item_name: item.product_title.replace(/["']/g, ""),
                  item_brand: item.vendor,
                  item_category: item.product_type,
                  item_variant: item.variant_title,
                  variant_id: item.variant_id,
                  item_price: Number.parseFloat(item.price / 100),
                  sku: item.sku,
                  quantity: item.quantity,
                  item_handle: item.handle,
                },
              ],
            },
          };
          window.dataLayer.push(productData);
        };
        document.addEventListener("rebuy:cart.add", addToCartHandler);
        document.addEventListener(
          "rebuy:smartcart.product-removed",
          removeFromCartHandler
        );
      }
      window.analyzify.checkoutEventFunc = async () => {
        const viewCart = async function () {
          window.dataLayer.push({ ecommerce: null });
          try {
            const cartObj = await fetch("/cart.js")
              .then(function (response) {
                return response.json();
              })
              .catch(function (e) {
                analyzify.log(e);
              });
            const multipleProdsArr = analyzify.multipleCartProdInfos(
              cartObj.items
            );
            let items = [];
            multipleProdsArr.forEach((product) => {
              items.push(product);
            });
            window.dataLayer.push({
              event: "ee_begin_checkout",
              page_type: "cart",
              ecommerce: {
                currency: detectedCurrency,
                value: parseFloat((cartObj.total_price * 0.01).toFixed(2)),
                total_item: items.length,
                total_quantity: Number(cartObj.item_count),
                analyzify_source: "advanced",
                implementation_type: "extension",
                items: items,
              },
            });
          } catch (error) {
            analyzify.log(error);
          }
        };
        viewCart();
      };
      window.analyzify.rfcEventFunc = async () => {
        const removedItem = [];
        const possibleIDs = [];
        const cartItems = await fetch("/cart.js").then((response) =>
          response.json()
        );
        const { items: cartItemsJson } = cartItems;
        for (let i = 0; i < analyzify.foundElements.length; i++) {
          const formElement = analyzify.foundElements[i];
          if (formElement) {
            if (formElement.getAttribute("href")) {
              if (
                formElement.getAttribute("href").includes("/cart/change?line=")
              ) {
                const productCartOrder_1 = formElement
                  .getAttribute("href")
                  .split("change?line=")[1];
                const productCartOrder =
                  productCartOrder_1.split("&quantity")[0];
                for (let i = 0; i < cartItems.items.length; i++) {
                  if (i + 1 == productCartOrder) {
                    removedItem.push(cartItems.items[i]);
                  }
                }
              } else if (
                formElement
                  .getAttribute("href")
                  .includes("/cart/change?quantity=0&line=")
              ) {
                const productCartOrder = formElement
                  .getAttribute("href")
                  .split("/cart/change?quantity=0&line=")[1];
                for (let i = 0; i < cartItems.items.length; i++) {
                  if (i + 1 == productCartOrder) {
                    removedItem.push(cartItems.items[i]);
                  }
                }
              }
            } else if (formElement.getAttribute("alt")) {
              const productName_1 = formElement.getAttribute("alt");
              const productName_2 = productName_1.replace("Remove ", "");
              for (let i = 0; i < cartItems.items.length; i++) {
                if (cartItems.items[i].product_title == productName_2) {
                  removedItem.push(cartItems.items[i]);
                }
              }
            } else if (formElement.getAttribute("data-index")) {
              const productCartOrder = formElement.getAttribute("data-index");
              for (let i = 0; i < cartItems.items.length; i++) {
                if (i + 1 == productCartOrder) {
                  removedItem.push(cartItems.items[i]);
                }
              }
            }
            if (!removedItem.length) {
              const attrValues = formElement
                .getAttributeNames()
                .map((name) => formElement.getAttribute(name));
              attrValues.forEach((formElement) => {
                if (formElement.match(/([0-9]+)/g)) {
                  possibleIDs.push(formElement.match(/([0-9]+)/g));
                }
              });
              possibleIDs.forEach((possibleID) => {
                possibleID.forEach((id) => {
                  cartItems.items.filter(function (product) {
                    if (product.variant_id == Number(id)) {
                      removedItem.push(product);
                    }
                  });
                });
              });
            }
            if (removedItem[0]) {
              const singleProdArr = analyzify.singleProdInfos(removedItem[0]);
              window.dataLayer.push({ ecommerce: null });
              window.dataLayer.push({
                event: "ee_remove_from_cart",
                ecommerce: {
                  currency: detectedCurrency,
                  value: parseFloat(
                    (
                      singleProdArr[0].price * singleProdArr[0].quantity
                    ).toFixed(2)
                  ),
                  analyzify_source: "advanced",
                  implementation_type: "extension",
                  items: [{ ...singleProdArr[0], index: 1 }],
                },
              });
              analyzify.log("Product ee_removeFromCart==>", window.dataLayer);
              break; // Döngüyü sonlandır
            } else {
              analyzify.log("Removed element not found");
            }
          }
        }
      };

      if (window.analyzify.shopify_template == "product") {
        window.addEventListener("load", (event) => {
          if (analyzify.pageFly) {
            const element1 = document.querySelector(
              '[data-pf-type="ProductATC"]'
            );
            const element2 = document.querySelector(
              '[data-pf-type="ProductATC2"]'
            );
            if (element2)
              element2.addEventListener("click", analyzify.atcEventFunc);
            if (element1)
              element1.addEventListener("click", analyzify.atcEventFunc);
          }
        });
      }

      window.onload = function () {
        const templateName = window.analyzify.shopify_template;
        let templateTrue = false;
        if (templateName == "index" || templateName == "page") {
          templateTrue = true;
        }
        if (window.__shgProductInits && templateTrue && window.analyzify.shogun_active) {
          const shogunAllProds = window.__shgProductInits;
          const shogunHeadingElement = document.querySelector(
            ".shogun-heading-component h1"
          );
          const shogunProductAllClass = "shg-product";
          const shogunProductBtnClass = "shg-product-atc-btn-wrapper";
          const productBtns = document.querySelectorAll(
            "." + shogunProductBtnClass
          );
          const pageUrl = window.location.href;
          let collectionTitle = "Homepage";
          let collectionHandle = "Homepage";
          let atcSent = false;
          if (pageUrl.indexOf("pages/") !== -1) {
            if (shogunHeadingElement) {
              collectionTitle = shogunHeadingElement.textContent.trim();
            }
            collectionHandle = pageUrl.substring(
              pageUrl.indexOf("pages/") + "pages/".length
            );
          }
          const prodElements = document.querySelectorAll(
            "." + shogunProductAllClass
          );
          const idArray = [];
          prodElements.forEach((element) => {
            idArray.push(element.id);
          });
          const listedProds = shogunAllProds.filter((product) =>
            idArray.includes(product.uuid)
          );
          window.dataLayer.push({ ecommerce: null });
          window.dataLayer.push({
            event: "ee_view_item_list",
            category_title: collectionTitle,
            category_handle: collectionHandle,
            listedProds,
          });
          document.addEventListener("click", function (event) {
            const clickedElement = event.target;
            let shgProductId = null;
            let parentElement = clickedElement.parentNode;
            window.dataLayer.push({ ecommerce: null });
            while (parentElement && !shgProductId) {
              if (
                parentElement.classList &&
                parentElement.classList.contains(shogunProductAllClass)
              ) {
                shgProductId = parentElement.id;
              }
              parentElement = parentElement.parentNode;
            }
            if (clickedElement.closest("." + shogunProductBtnClass)) {
              if (shgProductId && atcSent == false) {
                atcSent = true;
                const clickedProduct = shogunAllProds.find(
                  (product) => product.uuid === shgProductId
                );
                const dataLayerObj = {
                  event: "ee_add_to_cart",
                  category_title: collectionTitle,
                  category_handle: collectionHandle,
                  clickedProduct,
                };
                window.dataLayer.push(dataLayerObj);
                setInterval(function () {
                  atcSent = false;
                }, 1000);
              }
            } else {
              if (shgProductId) {
                const clickedProduct = shogunAllProds.find(
                  (product) => product.uuid === shgProductId
                );
                const dataLayerObj = {
                  event: "ee_select_item",
                  item_list_id: window.analyzify.collection.id,
              item_list_name: window.analyzify.collection.title,
                  category_title: collectionTitle,
                  category_handle: collectionHandle,
                  clickedProduct,
                };
                window.dataLayer.push(dataLayerObj);
              }
            }
          });
        }
      };
      window.analyzify.atcEventFunc = function () {
        const singleProdArr = window.analyzify.singleProdInfos(
          window.analyzify.product.productJson
        );
        const formElement = analyzify.foundAtcElementForms[0];
        let variantInput = window.analyzify.product.variantInput;
        let productPrice = 0;
        let variantSku = "";
        let variantName = "";
        if (!analyzify.pageFly && formElement) {
          const formVariantInput = Array.from(formElement.elements).find(
            (item) => item.name === "id"
          );
          variantInput = formVariantInput
            ? formVariantInput.value
            : variantInput;
        } else {
          const initialUrl = window.location.href;
          variantInput = initialUrl.includes("variant=")
            ? initialUrl.split("variant=")[1]
            : variantInput;
        }
        for (
          let i = 0;
          i < window.analyzify.product.productJson.variants.length;
          i++
        ) {
          if (
            window.analyzify.product.productJson.variants[i].id == variantInput
          ) {
            productPrice =
              window.analyzify.product.productJson.variants[i].price;
            variantSku = window.analyzify.product.productJson.variants[i].sku;
            variantName =
              window.analyzify.product.productJson.variants[i].public_title ||
              window.analyzify.product.productJson.variants[i].title;
            break;
          }
        }
        const prodQty = analyzify.findQuantity() || 1;
        const collectionId =
          window.analyzify.product.collectionId != ""
            ? window.analyzify.product.collectionId
            : null;
        const collectionTitle =
          window.analyzify.product.collectionTitle != ""
            ? window.analyzify.product.collectionTitle
            : null;
        const collectionHandle =
          window.analyzify.product.collectionHandle != ""
            ? window.analyzify.product.collectionHandle
            : null;
        singleProdArr[0].item_variant = variantName;
        singleProdArr[0].item_variant_id = variantInput;
        singleProdArr[0].item_sku = variantSku;
        singleProdArr[0].price = productPrice / 100;
        singleProdArr[0].id = window.analyzify.adsIdFormat(
          (item_id = singleProdArr[0].item_id || null),
          (item_variant_id =
            singleProdArr[0].item_variant_id || null),
          (item_sku = singleProdArr[0].item_sku || null)
        );
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          event: "ee_add_to_cart",
          ecommerce: {
            currency: detectedCurrency,
            value: parseFloat((productPrice * 0.01 * prodQty).toFixed(2)),
            analyzify_source: "advanced",
            implementation_type: "extension",
            items: [
              {
                ...singleProdArr[0],
                index: 1,
                category_id: collectionId,
                category_title: collectionTitle,
                category_handle: collectionHandle,
                quantity: prodQty,
              },
            ],
          },
        });
        analyzify.log("Product ee_add_to_cart==>");
        analyzify.log(window.dataLayer);
      };
      window.analyzify.wishlistEventFunc = function () {
        const initialUrl = window.location.href;
        let variantInput = window.analyzify.product.variantInput;
        if (initialUrl.includes("variant=")) {
          variantInput = initialUrl.split("variant=")[1];
        }
        const selectedVariant =
          window.analyzify.product.productJson.variants.find(
            (variant) => variant.id === variantInput
          );
        const {
          price: productPrice,
          sku: variantSku,
          public_title: variantName = "",
        } = selectedVariant || {};
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          event: "ee_add_to_wishlist",
          ecommerce: {
            currency: detectedCurrency,
            value: Number.parseFloat((productPrice * 0.01).toFixed(2)),
            analyzify_source: "advanced",
            implementation_type: "extension",
            items: [
              {
                ...singleProdArr[0],
                index: 1,
                item_category: collectionTitle,
                quantity: 1,
              },
            ],
          },
        });
        analyzify.log("Product ee_add_to_wishlist==>");
        analyzify.log(window.dataLayer);
      };
      window.analyzify.collAtcEventFunc = function () {
        let formElement = analyzify.foundAtcElementForms[0];
        if (!formElement) {
          if (analyzify.foundAtcElementForms.length > 1) {
            formElement = analyzify.foundAtcElementForms[1];
            if (!formElement)
              return analyzify.log(
                "Parent form element not found for quick view atc"
              );
          } else {
            return analyzify.log(
              "Parent form element not found for quick view atc"
            );
          }
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
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          event: "ee_add_to_cart",
          ecommerce: {
            currency: detectedCurrency,
            value: Number.parseFloat(
              ((addedProduct.price / 100) * prodQty).toFixed(2)
            ),
            analyzify_source: "advanced",
            implementation_type: "extension",
            items: [{ ...singleProdArr[0], index: 1, quantity: prodQty }],
          },
        });
        analyzify.log("Product ee_add_to_cart ==>");
        analyzify.log(window.dataLayer);
      };
      window.analyzify.colProdClickFunc = function () {
        function clickedEvent(foundProd) {
          window.dataLayer.push({ ecommerce: null });
          const singleProdArr = window.analyzify.singleProdInfos(foundProd);
          window.dataLayer.push({
            event: "ee_select_item",
            ecommerce: {
              currency: detectedCurrency,
              item_list_id: window.analyzify.collection.id,
              item_list_name: window.analyzify.collection.title,
              value: foundProd.price / 100,
              analyzify_source: "advanced",
              implementation_type: "extension",
              items: [{ ...singleProdArr[0], index: 1 }],
            },
          });
        }
        if (analyzify.foundElements[0].hasAttribute("href")) {
          var href = analyzify.foundElements[0].getAttribute("href");
          if (href.includes("/products/")) {
            var handle = href.split("/products/")[1].split("?")[0];
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
      window.analyzify.searchProdClickFunc = function () {
        if (analyzify.foundElements[0].hasAttribute("href")) {
          var href = analyzify.foundElements[0].getAttribute("href");
          if (href.includes("/products/")) {
            var handle_0 = href.split("/products/")[1];
            var handle = handle_0.split("?")[0];
            var prodPosition;
            window.analyzify.search.results.forEach((product, i) => {
              if (handle == product.handle) prodPosition = i + 1;
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
            window.dataLayer.push({ ecommerce: null });
            window.dataLayer.push({
              event: "ee_select_item",
              ecommerce: {
                currency: detectedCurrency,
                value: clickedProduct[0].price / 100,
                analyzify_source: "advanced",
                implementation_type: "extension",
                items: [{ ...singleProdArr[0], index: prodPosition }],
              },
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

      if (window.analyzify.shopify_template == "collection") {
        analyzify.CollectionPageHandle();
        eval(window.analyzify.custom_scripts_collection);
      } else if (window.analyzify.shopify_template == "search") {
        analyzify.SearchPageHandle();
      } else if (window.analyzify.shopify_template == "product") {
        analyzify.ProductPageHandle();
        window.addEventListener("load", function () {
          const getVariantOptions = document.querySelector("variant-radios");
          if (getVariantOptions !== null) {
            let timeout;
            getVariantOptions.addEventListener("change", function () {
              clearTimeout(timeout);
              timeout = setTimeout(function () {
                let urlObject = new URL(window.location.href);
                let variantID = urlObject.searchParams.get("variant");
                const selectedVariant =
                  window.analyzify.product.productJson.variants.find(
                    (variant) => Number(variant.id) === Number(variantID)
                  );
                if (variantID) {
                  dataLayer.push({
                    event: "ee_variant_changed",
                    variant_id: variantID,
                    variant_title: selectedVariant.title || null,
                    product_price: selectedVariant.price / 100,
                    product_sku: selectedVariant.sku,
                    variant_availability:
                      selectedVariant.available == true ||
                        selectedVariant.available == "true"
                        ? true
                        : false,
                  });
                }
              }, 200);
            });
          }
        });
        eval(window.analyzify.custom_scripts_product);
      } else if (window.analyzify.shopify_template == "cart") {
        analyzify.cartPageHandle();
        if (!window.analyzify.detectedCart.empty) {
          window.analyzify.cartItems = window.analyzify.detectedCart.items;
          eval(window.analyzify.custom_scripts_cart);
        }
      }
    };
  };
  analyzify.Initialize();
  analyzify.loadScript(function () {
    analyzify.AppStart();
  });
};
