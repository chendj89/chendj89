const fs = require("fs");

function run() {
  let content = `
  更新时间：${new Date().toLocaleString()}
  ![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=chendj89&theme=gruvbox&show_icons=true)`;

  try {
    // "./docs/.vuepress/dist/readme.md",
    fs.writeFileSync("./readme.md", content, () => {
      console.log(`更新完成`);
    });
  } catch (error) {
    console.log(error);
  }
}
run();
