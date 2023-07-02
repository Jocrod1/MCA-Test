import { Feed } from "../../models"

type FeedAction = {
    type: string,
    feed?: Feed,
}

type Dispatchtype = (args: FeedAction) => FeedAction