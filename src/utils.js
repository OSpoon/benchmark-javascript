const Benchmark = require("benchmark");
const { Table } = require("console-table-printer");

const p = new Table({
  columns: [
    { name: "case", title: "测试用例" },
    { name: "hz", title: "执行次数/秒" },
    { name: "rme", title: "相对误差" },
    { name: "sampled", title: "总执行次数" },
    { name: "conclusion", title: "结论" },
  ],
  sort: (r1, r2) => Number(r1.hzs) - Number(r2.hzs),
  disabledColumns: ["hzs"],
});

module.exports = {
  getRows: function (events) {
    const result = [];
    Object.keys(events).forEach((key) => {
      if (/^\d{0,}$/g.test(key)) {
        const {
          name,
          hz,
          stats: { sample, rme },
        } = events[key];
        const size = sample.length;
        result.push({
          case: name,
          hz: Benchmark.formatNumber(hz.toFixed(hz < 100 ? 2 : 0)),
          hzs: hz,
          rme: `\xb1${rme.toFixed(2)}%`,
          sampled: `${size} run${size == 1 ? "" : "s"} sampled`,
        });
      }
    });
    return result;
  },
  p,
  addRow: function (row, isFastest) {
    p.addRow(
      {
        ...row,
        conclusion: isFastest ? "🏆 Fastest" : "💔 Slowest",
      },
      { color: isFastest ? "yellow" : "cyan" }
    );
  },
};
