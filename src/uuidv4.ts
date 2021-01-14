// import { randomFillSync } from 'crypto';

// function validate(uuid) {
//   const re = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
//   return typeof uuid === 'string' && re.test(uuid);
// }

// const rng = () => {
//   const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
//   let poolPtr = rnds8Pool.length;

//   if (poolPtr > rnds8Pool.length - 16) {
//     randomFillSync(rnds8Pool);
//     poolPtr = 0;
//   }
//   return rnds8Pool.slice(poolPtr, (poolPtr += 16));
// }

// const stringify = (arr, offset = 0): string => {
//   /**
//    * Convert array of 16 byte values to UUID string format of the form:
//    * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
//    */
//   const byteToHex = [];

//   for (let i = 0; i < 256; ++i) {
//     byteToHex.push((i + 0x100).toString(16).substr(1));
//   }

//   // Note: Be careful editing this code!  It's been tuned for performance
//   // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
//   const uuid = (
//     byteToHex[arr[offset + 0]] +
//     byteToHex[arr[offset + 1]] +
//     byteToHex[arr[offset + 2]] +
//     byteToHex[arr[offset + 3]] +
//     '-' +
//     byteToHex[arr[offset + 4]] +
//     byteToHex[arr[offset + 5]] +
//     '-' +
//     byteToHex[arr[offset + 6]] +
//     byteToHex[arr[offset + 7]] +
//     '-' +
//     byteToHex[arr[offset + 8]] +
//     byteToHex[arr[offset + 9]] +
//     '-' +
//     byteToHex[arr[offset + 10]] +
//     byteToHex[arr[offset + 11]] +
//     byteToHex[arr[offset + 12]] +
//     byteToHex[arr[offset + 13]] +
//     byteToHex[arr[offset + 14]] +
//     byteToHex[arr[offset + 15]]
//   ).toLowerCase();

//   // Consistency check for valid UUID.  If this throws, it's likely due to one
//   // of the following:
//   // - One or more input array values don't map to a hex octet (leading to
//   // "undefined" in the uuid)
//   // - Invalid input values for the RFC `version` or `variant` fields
//   if (!validate(uuid)) {
//     throw TypeError('Stringified UUID is invalid');
//   }

//   return uuid;
// }

// export class Uuid {

//   public static v4(): string {

//     const rnds = rng();

//     // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
//     rnds[6] = (rnds[6] & 0x0f) | 0x40;
//     rnds[8] = (rnds[8] & 0x3f) | 0x80;

//     return stringify(rnds);
//   }

// }


// // function v4(options, buf, offset) {
// //   options = options || {};

// //   const rnds = options.random || (options.rng || rng)();

// //   // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
// //   rnds[6] = (rnds[6] & 0x0f) | 0x40;
// //   rnds[8] = (rnds[8] & 0x3f) | 0x80;

// //   // Copy bytes to buffer, if provided
// //   if (buf) {
// //     offset = offset || 0;

// //     for (let i = 0; i < 16; ++i) {
// //       buf[offset + i] = rnds[i];
// //     }

// //     return buf;
// //   }

// //   return stringify(rnds);
// // }

// // const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
// // let poolPtr = rnds8Pool.length;
