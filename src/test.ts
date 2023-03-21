import { Itunes } from ".";
const itunes = new Itunes();

itunes
  .searchMusics({ term: "first death", limit: 10, offset: 10 })
  .then((res) => console.log(res));
