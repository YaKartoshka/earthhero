window.analyzify.initEProductViewItem = () => {

const ga4productJson = window.analyzify.product.productJson;
const ga4collectionTitle = window.analyzify.product.collectionTitle;
const ga4collectionId = window.analyzify.product.collectionId;
const ga4collectionHandle = window.analyzify.product.collectionHandle;
const singleProdArr = window.analyzify.singleProdInfos(window.analyzify.product.productJson);
window.analyzify.ga4ProductPageHandle = function() {
    const ecommerce = {
        currency: window.analyzify.detectedCart.currency,
        value:  window.analyzify.product.value,
        analyzify_source: 'lightweight',
        items: [{
            ...singleProdArr[0],
            index: 0,
            business_vertical: 'retail',
        }]
    }
    gtag("event", "view_item",{
      ...window.analyzify.sh_info_obj,
        ...ecommerce
    });
    if(analyzify.properties.PINTEREST.tracking){
        //pintrk('setconsent', true);
        pintrk('track', 'PageVisit', {
          currency: window.analyzify.detectedCart.currency,
          line_items: {
            'product_name': singleProdArr[0].item_name, 
            'product_id': singleProdArr[0].item_id,
            'product_price': singleProdArr[0].price,
            'product_brand': singleProdArr[0].item_brand,
            'product_category': singleProdArr[0].item_type
          }
        });
    }
    if(analyzify.properties.GADS.tracking && analyzify.properties.GADS.conversions.view_item.value !="null" && analyzify.properties.GADS.conversions.view_item.value !=""){
        gtag('event', 'conversion', {
            'send_to': analyzify.properties.GADS.id + '/' + analyzify.properties.GADS.conversions.view_item.value,
            ...ecommerce
        });
    }
    if(analyzify.properties.FACEBOOK.tracking){
        fbq('track', 'ViewContent',{
            content_name: singleProdArr[0].item_name,
            content_type: "product_group",
            content_ids:[singleProdArr[0].item_id],
            value: singleProdArr[0].price,
            currency: window.analyzify.detectedCart.currency
        });
    }
    if(analyzify.properties.CRITEO.tracking){
        window.criteo_q.push(
          { event: "viewItem",
            item: singleProdArr[0].item_id,
            price: singleProdArr[0].price
          });
    }
    if(analyzify.properties.KLAVIYO.tracking){
        var _learnq = _learnq || [];
        var item = {
          "Name": singleProdArr[0].item_name,
          "ProductID": singleProdArr[0].item_id,
          //"ImageURL": "https:",
          "URL": window.location.href,
          "Brand": singleProdArr[0].item_brand,
          "Price": singleProdArr[0].price,
          "CompareAtPrice": singleProdArr[0].price
        };
      
        _learnq.push(["track", "Viewed Product", item]);
      
        _learnq.push(["trackViewedItem", {
          "Title": item.ProductName,
          "ItemId": item.ProductID,
          "Categories": item.Categories,
          //"ImageUrl": item.ImageURL,
          "Url": item.URL,
          "Metadata": {
            "Brand": item.Brand,
            "Price": item.Price,
            "CompareAtPrice": item.CompareAtPrice
          }
        }]);
    }
};
analyzify.ga4ProductPageHandle();
}