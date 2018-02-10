module.exports.format = comment =>
  (comment.body.length > 400 ? `[Link](https://reddit.com${comment.permalink})` : comment.body.replace(/\n/g, "    "));
