module.exports = (
  import('@sequencemedia/hooks')
    .then(({
      postCommit
    }) => (
      postCommit()
    ))
)
