export type SourceItem = {
  published: Date | undefined;
  element: HTMLDivElement | undefined;
  slug: string | undefined;
  shouldReplace: boolean;
  data: any;
};

export type SlotsInstance = {
  sourceItems: SourceItem[];
  listElement: listElement;
  slotItems: SlotItem[];
  emptySlots;
  //   templateElement: HTMLElement;
};

export type SlotItem = {
  slug: string;
  index: number;
  element: HTMLDivElement;
  isPopulated: boolean;
};

export type SourceData = {
  title: string;
  slug: string;
  img: string;
  published: string;
  category: string;
};

export type SourceElements = {
  elements: HTMLDivElement[];
  parent: HTMLDivElement;
};

export type CategoryConstants = {
  en: string;
  locale: string;
};
