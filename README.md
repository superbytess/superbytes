# superbytes [![damianpolak](https://circleci.com/gh/damianpolak/superbytes.svg?style=shield)](https://circleci.com/gh/damianpolak/superbytes) ![npm](https://img.shields.io/npm/dm/superbytes)

> Convert bytes to a human readable string format

The tool converts bytes into other units in a friendly way. You can specify the number after the decimal point and rounding. Superbytes by default converts bytes in the traditional way IEC: 1024bytes = 1 KiB, but you can also use SI system (1000 bytes = 1 kB).

## Install

```
$ npm install superbytes
```
## Usage

```js
const superbytes = require('superbytes');

superbytes(423551030, 0);
// returns '404 MiB'
superbytes(423551030);
// returns '403.93 MiB'
superbytes(423551030, 3);
// returns '403.930 MiB'
superbytes(423551030, true);
// returns '423.55 MB'
superbytes(423551030, true, 3);
// returns '423.551 MB'
superbytes(72355103011, { metric: 'si'});
// returns '72.36 GB'
superbytes(423551030, { metric: 'iec'});
// returns '403.93 MiB'
superbytes(123456, { metric: 'si', digits: '5'});
// returns '123.45600 kB'
superbytes(123456, { metric: 'iec', digits: '3'});
// returns '120.563 KiB'
superbytes(123456, { digits: 5 });
// returns '120.56250 KiB'

```

## License

MIT © Damian Polak
