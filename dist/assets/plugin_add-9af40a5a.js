import{s as n,g as d,b as p,u}from"./index-e1ef2a64.js";async function f(i){var l;const r=i.replace("add ","").split(" "),c=new RegExp(/.*\.{1}.+/),t=((l=r.find(e=>c.test(e)))==null?void 0:l.split("?")[0])||"",s=r.find(e=>e!=t)||"";if(!s||!t){n("please check your key or url spell");return}if(d().findIndex(e=>e.key===s)>-1){n("the key already exist!");return}const a=p.getInstance();if(a===null)return;const o=[...(await a.fetchPlaceholders()).get("list")||[],{key:s,url:t.startsWith("http")?t:"http://"+t}];a.setPlaceholders(o),n(t.startsWith("http")?t:"http://"+t),u()}export{f as install};