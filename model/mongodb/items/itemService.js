import debug from "debug";
const log = debug("app:model:itemService");
import Item from "./item.js";

const createItemMongo = (itemData) => {
  let item = new Item(itemData);
  return item.save();
};

const getAllItemsMongo = () => {
  return Item.find();
};

const getItemByIdMongo = (id) => {
  return Item.findById(id);
};

const getAllMyItemsMongo = (user_id) => {
  return Item.find({ user_id });
};

const updateItemMongo = (id, itemData) => {
  return Item.findByIdAndUpdate(id, itemData, { new: true });
};

const updateLikeItemMongo = (id, likes) => {
  return Item.findByIdAndUpdate(id, { likes }, { new: true });
};

const patchPremiumNumberMongo = (id, premiumNumber) => {
  return Item.findByIdAndUpdate(id,premiumNumber, { new: true });
}

const deleteItemMongo = (id) => {
  return Item.findByIdAndDelete(id);
};
export {
  createItemMongo,
  getAllItemsMongo,
  getItemByIdMongo,
  getAllMyItemsMongo,
  updateItemMongo,
  updateLikeItemMongo,
  patchPremiumNumberMongo,
  deleteItemMongo,
};
