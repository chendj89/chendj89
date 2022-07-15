const fs = require("fs");

function run() {
  try {
    // "./docs/.vuepress/dist/readme.md",
    fs.writeFileSync(
      "./readme.md",
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
