const axios = require('axios');
const cheerio = require("cheerio");

const siteUrl = "https://www.wong.pe/tecnologia";
const productsAll = new Set();

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
}

const getResults = async () => {
  const $ = await fetchData();

  const section = $('.filters-title .titulo-sessao').text();

  $('.tecnologia .product-item').each((key, value) => {
    const products_img = value.children[3].children;
    const info = value.children[5];
    const image = products_img.filter(item => item.name === "a")[0].children[0].attribs;
    const description = info.children[1].children.filter(item => item.name === "a")[0].attribs;
    const price = info.children[3].children[1].children[3].children[0];

    productsAll.add({
      _id: key,
      image: image.src,
      description: description.title,
      price: price.data,
    })
  });
  
  return {
    section,
    products: [...productsAll]
  };
};

module.exports = getResults;
