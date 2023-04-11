/**
 * superbytes
 * https://github.com/damianpolak/superbytes
 *
 * Copyright 2018-2023, Damian Polak
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 * 
 * 
 * Usage: superbytes(bytes, arg) <-- default metric system is IEC and 2 decimal place
 *        superbytes(43211, { metric: 'iec'})
 *        superbytes(43211, { metric: 'si'})
 *        superbytes(43211, { metric: 'iec', digits: 5})
 *        superbytes(43211, { metric: 'iec', digits: 5})
 * 
 * Legacy usage: superbytes(bytes, arg1, arg2)
 *        bytes: number value in bytes
 *         arg1: true = SI Metric system, false = IEC Metric system (default),
 *         arg2: decimal place (default is 2)
 * 
 * You can use arg1 and arg2 interchangeably
 */

module.exports = superbytes = (bytes, arg1, arg2) => {
  'use strict';

  const iecUnits = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  const siUnits =  ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let units = [];

  const objArg = {
    keys: ['metric', 'digits', 'unit'],
    metric: ['iec', 'si'],
    unit: ['iec', 'si']
  }

  bytes = Math.abs(bytes);
  let divider, si, digits = 0;

  const params = {
    default: (nodigits = false) => {
      divider = 1024;
      si = false;
      units = iecUnits;
      if(!nodigits) digits = 2;
    },
    system: (type = 'iec' | 'si') => {
      if(type === 'iec') {
        divider = 1024;
        si = false;
        units = iecUnits;
      }
      if(type === 'si') {
        divider = 1000;
        si = true;
        units = siUnits;
      }
    },
    digits: (d = null) => {
      return d !== null ? d : 2;
    }
  };

  const legacyArgs = () => {
    if (arg1 === undefined && arg2 === undefined) {
      params.default();
    }

    if (typeof arg1 === 'boolean') {
      switch(arg1) {
        case true: params.system('si'); break;
        case false: params.system('iec'); break;
      }

      digits = typeof arg2 === 'number' ? params.digits(arg2) : params.digits();
  
    } else if (typeof arg1 === 'number') {
      digits = params.digits(arg1);
      if (typeof arg2 === 'boolean') {
        switch(arg2) {
          case true: params.system('si'); break;
          case false: params.system('iec'); break;
        }
      } else {
        params.default(true)
      }
    }
  }

  const objectArgs = () => {
    const argKeys = Object.keys(arg1);
    params.default();

    if(argKeys.length > 0) {
      argKeys.forEach(i => {
        if(!objArg.keys.includes(i)) {
          throw new Error(`Not recognized option: {${i}: \'${arg1[i]}\'} in arguments`);
        }
      });

      argKeys.forEach(item => {
        switch(item) {
          case 'metric':
            const m = arg1['metric'];
            if(objArg.metric.includes(m)) {
              params.system(m);
              digits = params.digits();
            }
          break;
          case 'digits':
            digits = params.digits(arg1['digits']);
          break;
          case 'unit':
          const s = arg1['unit'];
          if(objArg.metric.includes(s)) {
            switch(s) {
              case 'iec': units = iecUnits; break;
              case 'si': units = siUnits; break;
            }
          }
          break;
          default: 
        }
      });
    }
  }

  if(typeof arg1 === 'object') {
    objectArgs();
  } else {
    legacyArgs();
  }

  if (Number.isFinite(bytes)) {
    if (bytes < divider) {
      return `${bytes} ${units[0]}`;
    }

    for (let i = 1; i <= units.length - 1; i++) {
      if (bytes >= Math.pow(divider, i) && bytes < Math.pow(divider, i + 1)) {
        const num = (bytes / Math.pow(divider, i)).toFixed(digits);
        return `${num} ${units[i]}`;
      }
    }
  }
};