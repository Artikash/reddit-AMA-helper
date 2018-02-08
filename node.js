const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");
const reddit = new Snoowrap(require("./secrets"));

const client = new Snoostorm(reddit);
const stream = client.SubmissionStream(/*{ subreddit: "IAmA" }*/);

stream.on("submission", (post) => {
  console.log(post);
  if (post.author);
  //post.
  setTimeout(() => stream.emit("stop"), 10000);
});
