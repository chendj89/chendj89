/**
 * 名称开头大写
 * @param name 
 */
export function NametoUpperCase(name:string){
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
}