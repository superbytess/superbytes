<h1 align="center">Superbytes</h1>
<p align="center">
  <b>Superbytes is a Node.js library for converting bytes to human readable string format</b>
</p>
<br>

![npm](https://img.shields.io/npm/dw/superbytes) ![npm](https://img.shields.io/npm/v/superbytes) ![NPM](https://img.shields.io/npm/l/superbytes) ![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/superbytess/superbytes/node.js.yml)
![GitHub contributors](https://img.shields.io/github/contributors/superbytess/superbytes)



## Description
Superbytes will help you convert bytes into other units understandable for humans. The library automatically converts bytes and returns a string with the most optimal unit representation. The library also allows you to set the precision of numbers following the decimal point and choose the output metric in the form of either the IEC standard (1024 bytes = 1 kibibyte) or SI (1000 bytes = 1 kilobyte).

By default superbytes converts to IEC units.

The current version supports loading library using both CommonJS and ESModules.

## Installation

Latest version:
```bash
npm i superbytes@latest
```

## Usage

### Loading using CommonJS

```javascript
const superbytes = require('superbytes');

superbytes(423551030);
// returns '403.93 MiB'
superbytes(423551030, 3);
// returns '403.930 MiB'
superbytes(72355103011, { metric: 'si'});
// returns '72.36 GB'
superbytes(3123123, { precision: 5});
// returns '2.97844 MiB'
superbytes(912839123, { metric: 'si', precision: 5});
// returns '912.83912 MB'
```

### Loading using ES modules

```javascript
import { superbytes } from 'superbytes';

superbytes(423551030);
// returns '403.93 MiB'
superbytes(423551030, 3);
// returns '403.930 MiB'
superbytes(72355103011, { metric: 'si'});
// returns '72.36 GB'
superbytes(3123123, { precision: 5});
// returns '2.97844 MiB'
superbytes(912839123, { metric: 'si', precision: 5});
// returns '912.83912 MB'
```

## License

MIT © Damian Polak
