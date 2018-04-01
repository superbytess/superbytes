/*
 * superbytes.js
 * https://github.com/damianpolak/superbytes.js
 *
 * Copyright 2018, Damian Polak
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 */

// input: bytes - integer in bytes,
//        si - true or false (default is false)
//             false (default) - traditional system of units (1024)
//             true - International System of Units
//        digits - (default 2) The number of digits to appear after the decimal point
const superbytes = (bytes, digits, si) => {
   'use strict';
   const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   bytes = Math.abs(bytes);
   let divider = 0;
   // defaul si is traditional, change to true
   if(si === undefined) si = false;
   // default is round to 2 after the decimal
   if(digits === undefined) digits = 2;

   if(si === true) {
     divider = 1000;
   } else { divider = 1024; }

   if(Number.isFinite(bytes)) {
     if(bytes < divider) {
       let num = bytes;
       return `${num} ${UNITS[0]}`;
     }

     for(let i = 1; i <= 8; i++) {
       if(bytes >= Math.pow(divider, i) && bytes < Math.pow(divider, i+1)) {
         let num = (bytes/Math.pow(divider, i)).toFixed(digits);
         return `${num} ${UNITS[i]}`;
       }
     }
   }
 }
