const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
const ora = require("ora");
const chalk = require("chalk");
const { getRows, p, addRow } = require("./utils");
const { description } = Benchmark.platform;
const spinner = ora();

console.log(chalk.green(description));
spinner.start(chalk.grey("Testing ..."));

const cases = function (cases) {
  if (!cases) {
    throw new Error("Please add test cases correctly.");
  }
  if (!cases instanceof Array) {
    throw new Error("Please add a set of test cases correctly.");
  }
  // 添加case
  cases.forEach((c) => {
    const key = Object.keys(c)[0];
    suite.add(key, c[key]);
  });
  // 设置监听
  suite
    .on("cycle", function (event) {
      spinner.succeed(chalk.green(String(event.target)));
      spinner.start(chalk.grey("Testing next case ..."));
    })
    .on("complete", function () {
      spinner.succeed(chalk.green("Test completed"));
      getRows(this.filter("successful")).forEach((row) => {
        addRow(row, row.case === this.filter("fastest").map("name")[0]);
      });
      p.printTable();
    });
  return suite;
};

module.exports = {
  cases,
};
