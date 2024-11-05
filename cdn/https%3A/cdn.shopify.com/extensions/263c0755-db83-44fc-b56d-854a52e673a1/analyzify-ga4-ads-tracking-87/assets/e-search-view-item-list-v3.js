window.analyzify.initESearchViewItemList = () => {

const searchTerm = window.analyzify.search.terms;
const searchResults = window.analyzify.count;
const searchResultsJson = window.analyzify.results;
const multipleProdsArr = window.analyzify.multipleProdInfos(searchResultsJson);
let items = [];
let product_ids = [];
multipleProdsArr.forEach((product) => {
  items.push(product);
  product_ids.push(product.item_id);
});
window.analyzify.ga4SearchPageHandle = function(){
    const ecommerce = {
      ...window.analyzify.sh_info_obj,
        item_list_id: null,
        item_list_name: `Search Results: ${searchTerm}`,
        analyzify_source: 'lightweight',
        items: items
    }
  gtag("event", "search", {
    ...window.analyzify.sh_info_obj,
      analyzify_source: 'lightweight',
      search_term: searchTerm
  });
  gtag("event", "view_item_list", ecommerce);
  if(analyzify.properties.X.tracking && analyzify.properties.X.events.search != "null" && analyzify.properties.X.events.search != ""){
    twq('event', analyzify.properties.X.events.search, {
      search_string: searchTerm
    });
  }
  if(analyzify.properties.FACEBOOK.tracking){
    fbq('track', 'Search',{
        search_string: searchTerm,
    });
  }
  if(analyzify.properties.CRITEO.tracking){
    window.criteo_q.push(
      { event: "viewList",
      item: product_ids,
      category: "SearchList-"+searchTerm,
      keywords: searchTerm  
      });
  }
  if(analyzify.properties.KLAVIYO.tracking){
    var _learnq = _learnq || [];
    _learnq.push(['track', 'Category View', {
    'CategoryName' : "SearchList-"+searchTerm,
    }]);
  }
}
analyzify.ga4SearchPageHandle();

}