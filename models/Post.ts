export interface Post {
  title: string;
  id: number;
  url: string;
  previewUrl: string;
  fileType: string;
  fileSize: number;
  file: {
    ext: string,
    url: string,
    size: number
  };
  preview: {
    url: string
  };
  tags: {
    general: string[];
    copyright: string[];
    contributor: string[];
    species: string[];
    character: string[];
    artist: string[];
    invalid: string[];
    lore: string[];
    meta: string[];
  };
}
