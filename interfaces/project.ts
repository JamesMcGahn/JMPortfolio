export interface Project {
  _id: string;
  title: string;
  slug: string;
  mainPage: boolean;
  subtitle: string;
  description: string;
  challenges: string;
  stack: string[];
  imageUrl: ImageUrl[];
  gitUrl: string;
  liveUrl: string;
}

interface ImageUrl {
  url: string;
  filename: string;
}
