#!/usr/bin/env node

if (process.env.CI === 'true') process.exit(0)

// @ts-ignore
Promise.resolve(import('husky'))
  .then(({ default: husky }) => { husky() })
  .catch((e) => {
    if (e instanceof Error) {
      if ('code' in e) {
        const { code } = e
        if (code === 'ERR_MODULE_NOT_FOUND') return
      }

      const { message } = e
      if (message) console.error(`💥 ${message}`)
    }
  })
