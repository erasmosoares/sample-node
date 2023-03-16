const config = require("config");

const mapper = books => {
  const baseUrl = config.get("assetsBaseUrl");
  const mapImage = image => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`
  });

  return {
    //...books,
    name: books.name,
    images: books.images.map(mapImage)
  };
};

module.exports = mapper;
