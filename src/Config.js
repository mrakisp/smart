

//ENABLE REST API TO YOUR WOOCOMMERCE STORE AND PROVIDE THE INFOS
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
export const api = new WooCommerceRestApi({
  url: "",
  consumerKey: "",
  consumerSecret: "",
  version: "wc/v3"
});


//PROVIDE CURRENCY
export const currencySymbol = "€";

export const defaultPerPageProducts = 50;
