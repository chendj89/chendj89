const fs = require("fs");

function run() {
  console.log("cli");
  try {
    fs.writeFileSync("./docs/.vuepress/dist/readme.md", `123`, () => {
      console.log(`更新完成`);
    });
  } catch (error) {
    console.log(error);
  }
}
run();
