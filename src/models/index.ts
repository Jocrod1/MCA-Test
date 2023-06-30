


export type SearchChange = (value: string) => void;

export type SearchFunction = (entriesResponse: Array<Entry>) => void

export type ImageAttribute = {
  height: string;
};
export type LabelAttr = {
  label: string;
};
export type Pod_Image = {
  attributes: ImageAttribute;
  label: string;
};


export type Entry = {
  "im:image": Array<Pod_Image>;
  "im:artist": LabelAttr;
  title: LabelAttr;
};
export interface Feed {
    entry: Array<Entry>;
  }