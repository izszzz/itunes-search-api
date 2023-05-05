import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type ItunesArtwork = Record<
  "artworkUrl30" | "artworkUrl60" | "artworkUrl100",
  string
>;

export interface ItunesMusic extends ItunesArtwork {
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionArtistId: number;
  collectionViewUrl: string;
  collectionArtistViewUrl: string;
  country: string;
  currency: string;
  discCount: number;
  discNumber: number;
  isStreamable: true;
  kind: string;
  previewUrl: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackNumber: number;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}
export interface ItunesArtist {
  amgArtistId: number;
  artistId: number;
  artistLinkUrl: string;
  artistName: string;
  artistType: "Artist";
  primaryGenreId: number;
  primaryGenreName: string;
  wrapperType: string;
}
export interface ItunesAlbum extends ItunesArtwork {
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  collectionCensoredName: string;
  collectionExplictness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionType: string;
  collectionViewUrl: string;
  copyright: string;
  country: string;
  currency: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCount: number;
  wrapperType: "collection";
}
export interface ItunesResponse<T> {
  resultCount: number;
  results: T[];
}
export interface BaseParams {
  entity: "musicArtist" | "album" | "song";
  lang?: "en_us" | "ja_jp";
}
export interface BaseSearchParams extends BaseParams {
  term: string;
  limit: number;
  offset: number;
}
export interface BaseLookupParams extends BaseParams {
  id: number | string;
}
export interface LookupParams extends BaseLookupParams {}
export interface SearchParams extends BaseSearchParams {}

export class Itunes {
  get = <T>(path: string, config: AxiosRequestConfig) =>
    axios
      .create({ baseURL: "https://itunes.apple.com" })
      .get<null, AxiosResponse<ItunesResponse<T>>>(path, config);
  lookup = <T>({ lang = "en_us", ...params }: LookupParams) =>
    this.get<T>("/lookup", { params: { ...params, lang } });
  lookupArtist = (params: Omit<BaseLookupParams, "entity">) =>
    this.lookup<ItunesArtist>({ ...params, entity: "musicArtist" });
  lookupAlbum = (params: Omit<BaseLookupParams, "entity">) =>
    this.lookup<ItunesAlbum>({ ...params, entity: "album" });
  lookupMusic = (params: Omit<BaseLookupParams, "entity">) =>
    this.lookup<ItunesMusic>({ ...params, entity: "song" });
  search = <T>({ lang = "en_us", ...params }: SearchParams) =>
    this.get<T>("/search", { params });
  searchMusics = (params: Omit<BaseSearchParams, "entity">) =>
    this.search<ItunesMusic>({ ...params, entity: "song" });
  searchArtists = (params: Omit<BaseSearchParams, "entity">) =>
    this.search<ItunesArtist>({ ...params, entity: "musicArtist" });
  searchAlbums = (params: Omit<BaseSearchParams, "entity">) =>
    this.search<ItunesAlbum>({ ...params, entity: "album" });
}
