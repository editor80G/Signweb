export const getErrorMessage = (error) => {
    console.log(error.name)
    console.log(error.message);

    switch (error.name) {
        case 'ValidationError':
            return Object.values(error.errors).at(0).message; // 'User validation failed: email: This email is already taken!'
        default:
            return error.message;
    }
};


// const getErrorMessage = (error) => {
//     switch (error.code) {
//         case 11000:
//             return 'This email is already taken!';
//         case 11001:
//             return 'Duplicate key error!';
//         case 121:
//             return 'Document validation failure!';
//         case 66:
//             return 'Immutable field update error!';
//         case 50:
//             return 'Exceeded time limit!';
//         case 2:
//             return 'Bad value!';
//         case 13:
//             return 'Unauthorized!';
//         case 18:
//             return 'Authentication failed!';
//         case 26:
//             return 'Namespace not found!';
//         case 27:
//             return 'Conflicting operation in progress!';
//         case 48:
//             return 'Conflicting index operation!';
//         case 100:
//             return 'Invalid namespace!';
//         case 101:
//             return 'Index not found!';
//         case 102:
//             return 'Path not found!';
//         case 103:
//             return 'Cursor not found!';
//         case 104:
//             return 'User not found!';
//         case 105:
//             return 'Role not found!';
//         case 106:
//             return 'Invalid role modification!';
//         case 107:
//             return 'Invalid user modification!';
//         case 108:
//             return 'Invalid index specification!';
//         case 109:
//             return 'Invalid collection specification!';
//         case 110:
//             return 'Invalid database specification!';
//         case 111:
//             return 'Invalid namespace specification!';
//         case 112:
//             return 'Invalid cursor specification!';
//         case 113:
//             return 'Invalid user specification!';
//         case 114:
//             return 'Invalid role specification!';
//         case 115:
//             return 'Invalid index specification!';
//         case 116:
//             return 'Invalid collection specification!';
//         case 117:
//             return 'Invalid database specification!';
//         case 118:
//             return 'Invalid namespace specification!';
//         case 119:
//             return 'Invalid cursor specification!';
//         case 120:
//             return 'Invalid user specification!';
//         case 121:
//             return 'Invalid role specification!';
//         case 122:
//             return 'Invalid index specification!';
//         case 123:
//             return 'Invalid collection specification!';
//         case 124:
//             return 'Invalid database specification!';
//         case 125:
//             return 'Invalid namespace specification!';
//         case 126:
//             return 'Invalid cursor specification!';
//         case 127:
//             return 'Invalid user specification!';
//         case 128:
//             return 'Invalid role specification!';
//         case 129:
//             return 'Invalid index specification!';
//         case 130:
//             return 'Invalid collection specification!';
//         case 131:
//             return 'Invalid database specification!';
//         case 132:
//             return 'Invalid namespace specification!';
//         case 133:
//             return 'Invalid cursor specification!';
//         case 134:
//             return 'Invalid user specification!';
//         case 135:
//             return 'Invalid role specification!';
//         case 136:
//             return 'Invalid index specification!';
//         case 137:
//             return 'Invalid collection specification!';
//         case 138:
//             return 'Invalid database specification!';
//         case 139:
//             return 'Invalid namespace specification!';
//         case 140:
//             return 'Invalid cursor specification!';
//         case 141:
//             return 'Invalid user specification!';
//         case 142:
//             return 'Invalid role specification!';
//         case 143:
//             return 'Invalid index specification!';
//         case 144:
//             return 'Invalid collection specification!';
//         case 145:
//             return 'Invalid database specification!';
//         case 146:
//             return 'Invalid namespace specification!';
//         case 147:
//             return 'Invalid cursor specification!';
//         case 148:
//             return 'Invalid user specification!';
//         case 149:
//             return 'Invalid role specification!';
//         case 150:
//             return 'Invalid index specification!';
//         case 151:
//             return 'Invalid collection specification!';
//         case 152:
//             return 'Invalid database specification!';
//         case 153:
//             return 'Invalid namespace specification!';
//         case 154:
//             return 'Invalid cursor specification!';
//         case 155:
//             return 'Invalid user specification!';
//         case 156:
//             return 'Invalid role specification!';
//         case 157:
//             return 'Invalid index specification!';
//         case 158:
//             return 'Invalid collection specification!';
//         case 159:
//             return 'Invalid database specification!';
//         case 160:
//             return 'Invalid namespace specification!';
//         case 161:
//             return 'Invalid cursor specification!';
//         case 162:
//             return 'Invalid user specification!';
//         case 163:
//             return 'Invalid role specification!';
//         case 164:
//             return 'Invalid index specification!';
//         case 165:
//             return 'Invalid collection specification!';
//         case 166:
//             return 'Invalid database specification!';
//         case 167:
//             return 'Invalid namespace specification!';
//         case 168:
//             return 'Invalid cursor specification!';
//         case 169:
//             return 'Invalid user specification!';
//         case 170:
//             return 'Invalid role specification!';
//         case 171:
//             return 'Invalid index specification!';
//         case 172:
//             return 'Invalid collection specification!';
//         case 173:
//             return 'Invalid database specification!';
//         case 174:
//             return 'Invalid namespace specification!';
//         case 175:
//             return 'Invalid cursor specification!';
//         case 176:
//             return 'Invalid user specification!';
//         case 177:
//             return 'Invalid role specification!';
//         case 178:
//             return 'Invalid index specification!';
//         case 179:
//             return 'Invalid collection specification!';
//         case 180:
//             return 'Invalid database specification!';
//         case 181:
//             return 'Invalid namespace specification!';
//         case 182:
//             return 'Invalid cursor specification!';
//         case 183:
//             return 'Invalid user specification!';
//         case 184:
//             return 'Invalid role specification!';
//         case 185:
//             return 'Invalid index specification!';
//         case 186:
//             return 'Invalid collection specification!';
//         case 187:
//             return 'Invalid database specification!';
//         case 188:
//             return 'Invalid namespace specification!';
//         case 189:
//             return 'Invalid cursor specification!';
//         case 190:
//             return 'Invalid user specification!';
//         case 191:
//             return 'Invalid role specification!';
//         case 192:
//             return 'Invalid index specification!';
//         case 193:
//             return 'Invalid collection specification!';
//         case 194:
//             return 'Invalid database specification!';
//         case 195:
//             return 'Invalid namespace specification!';
//         case 196:
//             return 'Invalid cursor specification!';
//         case 197:
//             return 'Invalid user specification!';
//         case 198:
//             return 'Invalid role specification!';
//         case 199:
//             return 'Invalid index specification!';
//         case 200:
//             return 'Invalid collection specification!';
//         case 201:
//             return 'Invalid database specification!';
//         case 202:
//             return 'Invalid namespace specification!';
//         case 203:
//             return 'Invalid cursor specification!';
//         case 204:
//             return 'Invalid user specification!';
//         case 205:
//             return 'Invalid role specification!';
//         case 206:
//             return 'Invalid index specification!';
//         case 207:
//             return 'Invalid collection specification!';
//         case 208:
//             return 'Invalid database specification!';
//         case 209:
//             return 'Invalid namespace specification!';
//         case 210:
//             return 'Invalid cursor specification!';
//         case 211:
//             return 'Invalid user specification!';
//         case 212:
//             return 'Invalid role specification!';
//         case 213:
//             return 'Invalid index specification!';
//         case 214:
//             return 'Invalid collection specification!';
//         case 215:
//             return 'Invalid database specification!';
//         case 216:
//             return 'Invalid namespace specification!';
//         case 217:
//             return 'Invalid cursor specification!';
//         case 218:
//             return 'Invalid user specification!';
//         case 219:
//             return 'Invalid role specification!';
//         case 220:
//             return 'Invalid index specification!';
//         case 221:
//             return 'Invalid collection specification!';
//         case 222:
//             return 'Invalid database specification!';
//         case 223:
//             return 'Invalid namespace specification!';
//         case 224:
//             return 'Invalid cursor specification!';
//         case 225:
//             return 'Invalid user specification!';
//         case 226:
//             return 'Invalid role specification!';
//         case 227:
//             return 'Invalid index specification!';
//         case 228:
//             return 'Invalid collection specification!';
//         case 229:
//             return 'Invalid database specification!';
//         case 230:
//             return 'Invalid namespace specification!';
//         case 231:
//             return 'Invalid cursor specification!';
//         case 232:
//             return 'Invalid user specification!';
//         case 233:
//             return 'Invalid role specification!';
//         case 234:
//             return 'Invalid index specification!';
//         case 235:
//             return 'Invalid collection specification!';
//         case 236:
//             return 'Invalid database specification!';
//         case 237:
//             return 'Invalid namespace specification!';
//         case 238:
//             return 'Invalid cursor specification!';
//         case 239:
//             return 'Invalid user specification!';
//         case 240:
//             return 'Invalid role specification!';
//         case 241:
//             return 'Invalid index specification!';
//         case 242:
//             return 'Invalid collection specification!';
//         case 243:
//             return 'Invalid database specification!';
//         case 244:
//             return 'Invalid namespace specification!';
//         case 245:
//             return 'Invalid cursor specification!';
//         case 246:
//             return 'Invalid user specification!';
//         case 247:
//             return 'Invalid role specification!';
//         case 248:
//             return 'Invalid index specification!';
//         case 249:
//             return 'Invalid collection specification!';
//         case 250:
//             return 'Invalid database specification!';
//         case 251:
//             return 'Invalid namespace specification!';
//         case 252:
//             return 'Invalid cursor specification!';
//         case 253:
//             return 'Invalid user specification!';
//         case 254:
//             return 'Invalid role specification!';
//         case 255:
//             return 'Invalid index specification!';
//         case 256:
//             return 'Invalid collection specification!';
//         case 257:
//             return 'Invalid database specification!';
//         case 258:
//             return 'Invalid namespace specification!';
//         case 259:
//             return 'Invalid cursor specification!';
//         case 260:
//             return 'Invalid user specification!';
//         case 261:
//             return 'Invalid role specification!';
//         case 262:
//             return 'Invalid index specification!';
//         case 263:
//             return 'Invalid collection specification!';
//         case 264:
//             return 'Invalid database specification!';
//         case 265:
//             return 'Invalid namespace specification!';
//         case 266:
//             return 'Invalid cursor specification!';
//         case 267:
//             return 'Invalid user specification!';
//         case 268:
//             return 'Invalid role specification!';
//         case 269:
//             return 'Invalid index specification!';
//         case 270:
//             return 'Invalid collection specification!';
//         case 271:
//             return 'Invalid database specification!';
//         case 272:
//             return 'Invalid namespace specification!';
//         case 273:
//             return 'Invalid cursor specification!';
//         case 274:
//             return 'Invalid user specification!';
//         case 275:
//             return 'Invalid role specification!';
//         case 276:
//             return 'Invalid index specification!';
//         case 277:
//             return 'Invalid collection specification!';
//         case 278:
//             return 'Invalid database specification!';
//         case 279:
//             return 'Invalid namespace specification!';
//         case 280:
//             return 'Invalid cursor specification!';
//         case 281:
//             return 'Invalid user specification!';
//         case 282:
//             return 'Invalid role specification!';
//         case 283:
//             return 'Invalid index specification!';
//         case 284:
//             return 'Invalid collection specification!';
//         case 285:
//             return 'Invalid database specification!';
//         case 286:
//             return 'Invalid namespace specification!';
//         case 287:
//             return 'Invalid cursor specification!';
//         case 288:
//             return 'Invalid user specification!';
//         case 289:
//             return 'Invalid role specification!';
//         case 290:
//             return 'Invalid index specification!';
//         case 291:
//             return 'Invalid collection specification!';
//         case 292:
//             return 'Invalid database specification!';
//         case 293:
//             return 'Invalid namespace specification!';
//         case 294:
//             return 'Invalid cursor specification!';
//         case 295:
//             return 'Invalid user specification!';
//         case 296:
//             return 'Invalid role specification!';
//         case 297:
//             return 'Invalid index specification!';
//         case 298:
//             return 'Invalid collection specification!';
//         case 299:
//             return 'Invalid database specification!';
//         case 300:
//             return 'Invalid namespace specification!';
//         case 301:
//             return 'Invalid cursor specification!';
//         case 302:
//             return 'Invalid user specification!';
//         case 303:
//             return 'Invalid role specification!';
//         case 304:
//             return 'Invalid index specification!';
//         case 305:
//             return 'Invalid collection specification!';
//         case 306:
//             return 'Invalid database specification!';
//         case 307:
//             return 'Invalid namespace specification!';
//         case 308:
//             return 'Invalid cursor specification!';
//         case 309:
//             return 'Invalid user specification!';
//         case 310:
//             return 'Invalid role specification!';
//         case 311:
//             return 'Invalid index specification!';
//         case 312:
//             return 'Invalid collection specification!';
//         case 313:
//             return 'Invalid database specification!';
//         case 314:
//             return 'Invalid namespace specification!';
//         case 315:
//             return 'Invalid cursor specification!';
//         case 316:
//             return 'Invalid user specification!';
//         case 317:
//             return 'Invalid role specification!';
//         case 318:
//             return 'Invalid index specification!';
//         case 319:
//             return 'Invalid collection specification!';
//         case 320:
//             return 'Invalid database specification!';
//         case 321:
//             return 'Invalid namespace specification!';
//         case 322:
//             return 'Invalid cursor specification!';
//         case 323:
//             return 'Invalid user specification!';
//         case 324:
//             return 'Invalid role specification!';
//         case 325:
//             return 'Invalid index specification!';
//         case 326:
//             return 'Invalid collection specification!';
//         case 327:
//             return 'Invalid database specification!';
//         case 328:
//             return 'Invalid namespace specification!';
//         case 329:
//             return 'Invalid cursor specification!';
//         case 330:
//             return 'Invalid user specification!';
//         case 331:
//             return 'Invalid role specification!';
//         case 332:
//             return 'Invalid index specification!';
//         case 333:
//             return 'Invalid collection specification!';
//         case 334:
//             return 'Invalid database specification!';
//         case 335:
//             return 'Invalid namespace specification!';
//         case 336:
//             return 'Invalid cursor specification!';
//         case 337:
//             return 'Invalid user specification!';
//         case 338:
//             return 'Invalid role specification!';
//         case 339:
//             return 'Invalid index specification!';
//         case 340:
//             return 'Invalid collection specification!';
//         case 341:
//             return 'Invalid database specification!';
//         case 342:
//             return 'Invalid namespace specification!';
//         case 343:
//             return 'Invalid cursor specification!';
//         case 344:
//             return 'Invalid user specification!';
//         case 345:
//             return 'Invalid role specification!';
//         case 346:
//             return 'Invalid index specification!';
//         case 347:
//             return 'Invalid collection specification!';
//         case 348:
//             return 'Invalid database specification!';
//         case 349:
//             return 'Invalid namespace specification!';
//         case 350:
//             return 'Invalid cursor specification!';
//         case 351:
//             return 'Invalid user specification!';
//         case 352:
//             return 'Invalid role specification!';
//         case 353:
//             return 'Invalid index specification!';
//         case 354:
//             return 'Invalid collection specification!';
//         case 355:
//             return 'Invalid database specification!';
//         case 356:
//             return 'Invalid namespace specification!';
//         case 357:
//             return 'Invalid cursor specification!';
//         case 358:
//             return 'Invalid user specification!';
//         case 359:
//             return 'Invalid role specification!';
//         case 360:
//             return 'Invalid index specification!';
//         case 361:
//             return 'Invalid collection specification!';
//         case 362:
//             return 'Invalid database specification!';
//         case 363:
//             return 'Invalid namespace specification!';
//         case 364:
//             return 'Invalid cursor specification!';
//         case 365:
//             return 'Invalid user specification!';
//         case 366:
//             return 'Invalid role specification!';
//         case 367:
//             return 'Invalid index specification!';
//         case 368:
//             return 'Invalid collection specification!';
//         case 369:
//             return 'Invalid database specification!';
//         case 370:
//             return 'Invalid namespace specification!';
//         case 371:
//             return 'Invalid cursor specification!';
//         case 372:
//             return 'Invalid user specification!';
//         case 373:
//             return 'Invalid role specification!';
//         case 374:
//             return 'Invalid index specification!';
//         case 375:
//             return 'Invalid collection specification!';
//         case 376:
//             return 'Invalid database specification!';
//         case 377:
//             return 'Invalid namespace specification!';
//         case 378:
//             return 'Invalid cursor specification!';
//         case 379:
//             return 'Invalid user specification!';
//         case 380:
//             return 'Invalid role specification!';
//         case 381:
//             return 'Invalid index specification!';
//         case 382:
//             return 'Invalid collection specification!';
//         case 383:
//             return 'Invalid database specification!';
//         case 384:
//             return 'Invalid namespace specification!';
//         case 385:
//             return 'Invalid cursor specification!';
//         case 386:
//             return 'Invalid user specification!';
//         case 387:
//             return 'Invalid role specification!';
//         case 388:
//             return 'Invalid index specification!';
//         case 389:
//             return 'Invalid collection specification!';
//         case 390:
//             return 'Invalid database specification!';
//         case 391:
//             return 'Invalid namespace specification!';
//         case 392:
//             return 'Invalid cursor specification!';
//         case 393:
//             return 'Invalid user specification!';
//         case 394:
//             return 'Invalid role specification!';
//         case 395:
//             return 'Invalid index specification!';
//         case 396:
//             return 'Invalid collection specification!';
//         case 397:
//             return 'Invalid database specification!';
//         case 398:
//             return 'Invalid namespace specification!';
//         case 399:
//             return 'Invalid cursor specification!';
//         case 400:
//             return 'Invalid user specification!';
//         case 401:
//             return 'Invalid role specification!';
//         case 402:
//             return 'Invalid index specification!';
//         case 403:
//             return 'Invalid collection specification!';
//         case 404:
//             return 'Invalid database specification!';
//         case 405:
//             return 'Invalid namespace specification!';
//         case 406:
//             return 'Invalid cursor specification!';
//         case 407:
//             return 'Invalid user specification!';
//         case 408:
//             return 'Invalid role specification!';
//         case 409:
//             return 'Invalid index specification!';
//         case 410:
//             return 'Invalid collection specification!';
//         case 411:
//             return 'Invalid database specification!';
//         case 412:
//             return 'Invalid namespace specification!';
//         case 413:
//             return 'Invalid cursor specification!';
//         case 414:
//             return 'Invalid user specification!';
//         case 415:
//             return 'Invalid role specification!';
//         case 416:
//             return 'Invalid index specification!';
//         case 417:
//             return 'Invalid collection specification!';
//         case 418:
//             return 'Invalid database specification!';
//         case 419:
//             return 'Invalid namespace specification!';
//         case 420:
//             return 'Invalid cursor specification!';
//             default:
//                 return 'Something went wrong. Please try again later.';
//         }
//     };
