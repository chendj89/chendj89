const fs = require("fs");

function run() {
  try {
    fs.writeFileSync("./readme.md", new Date().toLocaleString(), () => {
      console.log(`更新完成`);
    });
    let str = fs.readFileSync("./readme.md", "utf-8");
    console.log(str);
  } catch (error) {
    console.log(error);
  }
}
run();
