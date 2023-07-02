import { PodcastDetail } from "../../models/Podcast"

type PodcastAction = {
    type: string,
    podcast?: PodcastDetail,
}

type DispatchPodcast = (args: PodcastAction) => PodcastAction;