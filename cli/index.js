const fs = require("fs");

function run() {
  try {
    fs.writeFileSync(
      "./docs/.vuepress/dist/readme.md",
      "更新：" + new Date().toLocaleString(),
      () => {
        console.log(`更新完成`);
      }
    );
  } catch (error) {
    console.log(error);
  }
}
run();
