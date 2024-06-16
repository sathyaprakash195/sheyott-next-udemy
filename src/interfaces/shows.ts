export interface IShow {
  _id: string;
  title: string;
  description: string;
  type: string;
  genre: string;
  theraticalReleaseDate: string;
  ottReleaseDate: string;
  duration: string;
  castAndCrew: {
    role: string;
    name: string;
  }[];
  mainImage: string;
  bannerImage: string;
  trailer: string;
  episodes: {
    name: string;
    content: string;
  }[];
  content: string;
  createdAt: string;
  updatedAt: string;
}
