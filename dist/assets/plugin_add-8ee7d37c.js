import{s as n,g as d,b as p,u}from"./index-76e91e87.js";async function f(c){var i;const r=c.replace("add ","").split(" "),o=new RegExp(/.*\.{1}.+/),t=((i=r.find(e=>o.test(e)))==null?void 0:i.split("?")[0])||"",s=r.find(e=>e!=t)||"";if(!s||!t){n("please check your key or url spell");return}if(d().findIndex(e=>e.key===s)>-1){n("the key already exist!");return}const a=p.getInstance();if(a===null)return;const l=[...(await a.fetchPlaceholders()).get("list")||[],{key:s,url:t.startsWith("http")?t:"http://"+t}];a.setPlaceholders(l),n(t.startsWith("http")?t:"http://"+t),u(l)}export{f as install};
