export type PodcastDetailResponse ={
    collectionId: number,
    artistName: string,
    collectionName: string,
    trackCount: number,
    artworkUrl600:string,
}

export type PodcastDetail = {
    collectionId: number,
    artistName: string,
    collectionName: string,
    artworkUrl600:string,
    trackCount: number,
    description: string,
    episodes: EpisodeDetail[],
    lastFetch?: string,
}

export type EpisodeDetail = {
    trackId:number,
    collectionName: string,
    trackName: string,
    shortDescription: string,
    releaseDate: string, 
    trackViewUrl: string,
    artworkUrl600:string,
    timeLength: string,
}
export type resultResponse = {
    resultCount: Number, 
    results: [PodcastDetailResponse, ...Array<EpisodeDetail>]
}