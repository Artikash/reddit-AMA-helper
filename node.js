const Snoowrap = require("snoowrap");
const reddit = new Snoowrap(require("./secrets"));
const { format } = require("./format");

reddit.getHot("IAmA").forEach((post) => {
  const answers = [];
  const questionPromises = [];
  if (!/\[AMA Request\]/.test(post.title) && post.ups > 50) {
    reddit
      .getUser(post.author.name)
      .getComments({ count: 100 })
      .forEach((comment) => {
        if (new RegExp(post.id).test(comment.link_url)) {
          answers.push(comment);
          questionPromises.push(reddit.getComment(comment.parent_id));
        }
      })
      .then(() => {
        Promise.all(questionPromises.map(question => question.fetch())).then((questions) => {
          if (post.comments.filter(comment => comment.author.name === "AMACompiler").length) {
            post.comments
              .filter(comment => comment.author.name === "AMACompiler")[0]
              .edit(`Question|Score|Answer|Score\n--|--|--|--\n${answers
                .map((answer, i) =>
                  `${format(questions[i])}|${questions[i].score}|${format(answer)}|${
                    answer.score
                  }`)
                .join("\n")}`);
          } else {
            post.reply(`Question|Score|Answer|Score\n--|--|--|--\n${answers
              .map((answer, i) =>
                `${format(questions[i])}|${questions[i].score}|${format(answer)}|${
                  answer.score
                }`)
              .join("\n")}`);
          }
        });
      });
  }
});
