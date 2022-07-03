export function getRoute(ins) {
  let $site = ins.proxy.$site;
  let hash = {};
  $site.pages.map((item) => {
    let urls = item.regularPath.replace(".html", "").split("/");
    if (urls) {
      if (!urls[0]) {
        urls.shift();
      }
    }
    urls.map((t1) => {
      if (!hash[urls[0]] && urls[0]) {
        hash[urls[0]] = {
          text: decodeURI(urls[0]),
          children: [],
        };
      }
      if (t1 !== urls[0]) {
        hash[urls[0]].children.push({
          text: decodeURI(t1),
          link: item.regularPath,
        });
      }
    });
  });
  let menu = [];
  for (let value in hash) {
    menu.push(hash[value]);
  }
  return menu;
}
