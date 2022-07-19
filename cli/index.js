const fs = require("fs");

function run() {
  let date = new Date();
  date.setHours(date.getHours() + 8);
  let updateTime= date.toLocaleTimeString("en-GB");
  let content = `
  更新时间：${updateTime}\n\t
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
