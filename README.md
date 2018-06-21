# superbytes
> Convert bytes to a human readable string format

The tool converts bytes into other units in a friendly way. You can specify the number after the decimal point and rounding. Superbytes by default converts bytes in the traditional way (1024bytes = 1 KB), but you can also select the International System of Units (1000 bytes = 1 kB).

## Usage

```js
const superbytes = require('superbytes.js');

superbytes(934);
// returns '934 B'
superbytes(243212);
// returns '237.51 KB'
superbytes(1234500);
// returns '1.18 MB'
superbytes(52364562347);
// returns '48.77 GB'
superbytes(1234500, 3);
// returns '1.177 MB'
superbytes(1234500, 4);
// returns '1.1773 MB'
superbytes(1234500, 5);
// returns '1.17731 MB'
superbytes(1234500, 0);
// returns '1 MB'

superbytes(1234500, 2, true);
// returns '1.23 MB' <-- SI way
superbytes(1234500, 2);
// returns '1.18 MB' <-- traditional way (1024^n)
```

## License

MIT © Damian Polak
