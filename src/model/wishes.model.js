const APIFeatures = require("../utils/api-features");
const Wishes = require("./wishes.mongo");

async function createWish(data) {
  return await Wishes.create(data);
}

async function getAllWishes(queryObj) {
  const WishesData = new APIFeatures(Wishes.find({}), queryObj)
    .sort()
    .paginate();
  return await WishesData.query;
}

async function updateWishes(id, emoji) {
  return await Wishes.findByIdAndUpdate(
    id,
    {
      $inc: {
        [`reactions.${emoji}`]: 1,
      },
    },
    { returnDocument: "after" },
  );
}

module.exports = { createWish, getAllWishes, updateWishes };
