import{b as l,t as c}from"./index-d60409d5.js";async function u(s){const t=l.getInstance();if(t===null)return;const a=(await t.fetchPlaceholders()).get("list"),o=s.replace("remove ",""),e=(a||[]).filter(n=>{const r=n.key!==o&&n.url.indexOf(o)===-1;return!r&&c(n.url),r});if(!e){c("cannot find revelant keyword, please check your placeholder again!");return}t.setPlaceholders(e),console.log(e)}export{u as install};
