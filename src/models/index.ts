

//MAIN MODELS
export type SearchChange = (value: string) => void;

export type SearchFunction = (entriesResponse: Array<Entry>) => void

export type ImageAttribute = {
  height: string;
};
export type LabelAttr = {
  label: string;
};
export type idAttribute = {
  "im:id": number,
}
export type Pod_Image = {
  attributes: ImageAttribute;
  label: string;
};

export type Pod_id ={
  attributes: idAttribute,
}


export type Entry = {
  "im:image": Array<Pod_Image>,
  "im:artist": LabelAttr,
  id: Pod_id,
  summary: LabelAttr,
  title: LabelAttr,
};
export interface Feed {
    entry: Array<Entry>;
    lastFetch?: string,
}


