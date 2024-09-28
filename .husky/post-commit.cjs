module.exports = (
  import('./hooks/index.mjs')
    .then(({
      postCommit
    }) => (
      postCommit()
    ))
)
