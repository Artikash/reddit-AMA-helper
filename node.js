const Snoowrap = require("snoowrap");
const reddit = new Snoowrap(require("./secrets"));

reddit.getHot("IAmA", { count: 100 }).forEach((post) => {
  console.log(post);
  if (!post.title.search("[AMA Request]")) {
    console.log("wtf");
    reddit
      .getUser(post.author)
      .getComments()
      .forEach((comment) => {
        console.log(comment);
      });
  }
});
