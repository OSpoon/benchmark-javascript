require("../src")
  .cases([
    {
      "RegExp#test": function () {
        /o/.test("Hello World!");
      },
    },
    {
      "String#indexOf": function () {
        "Hello World!".indexOf("o") > -1;
      },
    },
    {
      "String#match": function () {
        !!"Hello World!".match(/o/);
      },
    },
  ])
  .run({ async: true });
