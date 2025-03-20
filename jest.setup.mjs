import {
  TextEncoder,
  TextDecoder
} from 'node:util'

Object.assign(globalThis, {
  TextDecoder,
  TextEncoder
})
