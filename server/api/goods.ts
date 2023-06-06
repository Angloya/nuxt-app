import data from "~/data/data.json";
import { GoodsList } from "~/types/interfaces";

export default defineEventHandler((): GoodsList => {
  return data;
});
