import names from "~/data/names.json";
import { NamesData } from "~/types/interfaces";

export default defineEventHandler((): NamesData => {
  return names;
});
