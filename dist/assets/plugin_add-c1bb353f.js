import{s as i,g as c,b as h,u as y}from"./index-a22536fc.js";async function k(o){var n,r;const l=o.replace("add ","").split(" "),d=new RegExp(/.*\.{1}.+/),t=((n=l.find(e=>d.test(e)))==null?void 0:n.split("?")[0])||"",s=l.find(e=>e!=t)||"";if(!s||!t){i("please check your key or url spell");return}if(c().findIndex(e=>e.key===s)>-1){let e=(r=c().find(p=>p.key===s))==null?void 0:r.url;localStorage.setItem("lastMes","the key already exist! url is: "+e)}const a=h.getInstance();if(a===null)return;const u=[...(await a.fetchPlaceholders()).get("list")||[],{key:s,url:t.startsWith("http")?t:"http://"+t}];a.setPlaceholders(u),i(t.startsWith("http")?t:"http://"+t),y()}export{k as install};
