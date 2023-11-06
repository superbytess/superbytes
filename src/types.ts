export const iecUnits = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
export const siUnits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
export const objectArgs = {
  keys: ['metric', 'digits', 'type'],
  metric: ['iec', 'si'],
  map: {
    si: true,
    iec: false,
  },
};

export const divider = {
  iec: 1024,
  si: 1000,
};

export type Metric = 'iec' | 'si';

export type ArgDefinition = {
  divider: number;
  system: string[];
  digits: number;
};

export type ArgObject = {
  metric?: Metric;
  digits?: number;
};

export type ArgTypes = boolean | number | undefined;

export interface Extension {
  name: string;
  run(): string;
}

export enum ExtensionType {
  default = 'default',
  convert = 'convert',
}

export interface Arg {
  getArgDefinition(): ArgDefinition;
}
