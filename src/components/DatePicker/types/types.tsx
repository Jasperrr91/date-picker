export type WeekElement = DayElement[];

export type DayElement = {
  day: number,
  value: string,
  disabled: boolean,
};

export type DateState = {
  get: string,
  onClick: (arg: string) => void,
};

export type Date = {
  day: number,
  month: number,
  year: number,
};
