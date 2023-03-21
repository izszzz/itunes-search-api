import axios, { AxiosRequestConfig } from "axios";

export type ItunesArtwork = Record<
  "artworkUrl30" | "artworkUrl60" | "artworkUrl100",
  string
>;

export interface ItunesMusic extends ItunesArtwork {
  artistName: string;
  artistViewUrl: string;
  collectionArtistId: number;
  collectionArtistViewUrl: string;
  collectionCensoredName: string;
  trackId: number;
  trackViewUrl: string;
  trackCensoredName: string;
  previewUrl: string;
  viewURL: string;
  releaseDate: string;
}
export interface ItunesArtist {
  amgArtistId: number;
  artistId: number;
  artistLinkUrl: string;
  artistName: string;
  artistType: "Artist";
  primaryGenreId: 21;
  wrapperType: string;
}
export interface ItunesAlbum extends ItunesArtwork {
  amgArtistId: number;
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  collectionCensoredName: string;
  collectionExplictness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionType: "Album";
  collectionViewUrl: string;
  copyright: string;
  country: "USA";
  currency: "USD";
  primaryGenreName: "Pop";
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
}
export interface BaseSearchParams {
  term: string;
  limit: number;
  offset: number;
}
export interface BaseLookupParams {
  id: number | string;
}
export interface LookupParams extends BaseParams, BaseLookupParams {}
export interface SearchParams extends BaseParams, BaseSearchParams {}

export class Itunes {
  get = <T>(path: string, config: AxiosRequestConfig) =>
    axios
      .create({ baseURL: "https://itunes.apple.com" })
      .get<null, ItunesResponse<T>>(path, config);
  lookup = <T>(params: LookupParams) => this.get<T>("/lookup", { params });
  lookupArtist = ({ id }: BaseLookupParams) =>
    this.lookup<ItunesArtist>({ id, entity: "musicArtist" });
  lookupAlbum = ({ id }: BaseLookupParams) =>
    this.lookup<ItunesAlbum>({ id, entity: "album" });
  lookupMusic = ({ id }: BaseLookupParams) =>
    this.lookup<ItunesMusic>({ id, entity: "song" });
  search = <T>(params: SearchParams) => this.get<T>("/search", { params });
  searchMusics = (params: BaseSearchParams) =>
    this.search<ItunesMusic>({ ...params, entity: "song" });
  searchArtists = (params: BaseSearchParams) =>
    this.search<ItunesArtist>({ ...params, entity: "musicArtist" });
  searchAlbums = (params: BaseSearchParams) =>
    this.search<ItunesAlbum>({ ...params, entity: "album" });
}
