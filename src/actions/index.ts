import axios from "axios";
import { Feed } from "../models";
  
export const getMain = async () => {
    const { data } = await axios.get(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const { entry }: Feed = data.feed;
      return entry.map(entr => ({...entr, title:{...entr.title, label: entr.title.label.split(" - ")[0]}}));
}