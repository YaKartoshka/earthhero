window.analyzify.initEColViewItemList = () => {

const ga4collectionAllProducts = window.analyzify.collection.products;
const ga4collectionTitle = window.analyzify.collection.title;
const ga4collectionId = window.analyzify.collection.id;
const ga4collectionHandle = window.analyzify.collection.handle;
const multipleProdsArr = window.analyzify.multipleProdInfos(ga4collectionAllProducts);
window.analyzify.ga4CollectionPageHandle = function(){
    let items = [];
    let product_ids = [];
    multipleProdsArr.forEach((product) => {
    items.push(product);
    product_ids.push(product.item_id);
    });
    const ecommerce = {
        ...window.analyzify.sh_info_obj,
        item_list_id: ga4collectionId,
        item_list_name: ga4collectionTitle,
        analyzify_source: 'lightweight',
        items: items
    }
    gtag("event", "view_item_list", ecommerce);
    if(analyzify.properties.PINTEREST.tracking){
        //pintrk('setconsent', true);
        pintrk('track', 'ViewCategory');
    }
    if(analyzify.properties.CRITEO.tracking){
        window.criteo_q.push(
          { event: "viewList",
          item: product_ids,
          category: ga4collectionId,
          });
    }
    if(analyzify.properties.KLAVIYO.tracking){
        var _learnq = _learnq || [];
        _learnq.push(['track', 'Category View', {
        'CategoryName' : ga4collectionTitle,
        }]);
    }
};

}