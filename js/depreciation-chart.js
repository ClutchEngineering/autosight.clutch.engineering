function initializeDepreciationChart(){let e=new URLSearchParams(window.location.search),t=e.get("trim"),a=e.get("year"),l=document.getElementById("trim-filter");t&&(l.value=t);let r=document.getElementById("year-filter");a&&(r.value=a);let i=document.getElementById("mileagePriceChart").getContext("2d"),n;function o(){let e=document.getElementById("trim-filter").value,t=document.getElementById("year-filter").value,a=new URLSearchParams(window.location.search);e?a.set("trim",e):a.delete("trim"),t?a.set("year",t):a.delete("year");let l=`${window.location.pathname}?${a.toString()}`;window.history.replaceState({},"",l);let r=milagePrices,o=e&&"all"!=e,d=t&&"all"!=t;o&&(r=r.filter(t=>trims[t[3]]===e)),d&&(r=r.filter(e=>baseYear+e[2]===parseInt(t,10)));let c=r.map(e=>e[1]),g=r.map(e=>e[0]),m=r.map(e=>baseYear+e[2]),s=r.map(e=>trims[e[3]]),u=Math.min(...m),p=Math.max(...m),f;if(d&&!o){let y=[...new Set(s)],$=new Map;y.forEach((e,t)=>{let a=t/y.length*360;$.set(e,`hsl(${a}, 70%, 70%)`)}),f=s.map(e=>$.get(e))}else f=m.map(e=>`hsl(${(e-u)/(p-u)*360}, 70%, 70%)`);let h=r.filter(e=>e[1]>=200),b=h.map(e=>e[1]),x=h.map(e=>e[0]),E=calculateLogarithmicRegression(b,x),v=b.map(e=>predictPrice(e,E));n&&n.destroy();let _=e=>new Intl.NumberFormat().format(e);n=new Chart(i,{type:"scatter",data:{datasets:[{label:"Trend",data:b.map((e,t)=>({x:e,y:v[t]})),borderColor:"rgba(255, 99, 132, 1)",borderWidth:5,radius:0,fill:!1,enableMouseTracking:!1,type:"line"},{label:`Mileage vs Price for ${make} ${model}`,data:c.map((e,t)=>({x:e,y:g[t]})),backgroundColor:"rgba(75, 192, 192, 0.4)",pointStyle:"circle",pointRadius:3,hoverRadius:6,borderColor:f,borderWidth:1}]},options:{plugins:{legend:{labels:{filter:function(e,t){return"Upper Bound"!=e.text&&"Lower Bound"!=e.text}}},tooltip:{callbacks:{label:function(e){let t=_(e.raw.x),a=_(e.raw.y),l=baseYear+r[e.dataIndex][2],i=trims[r[e.dataIndex][3]];return i?`price: $${a} — mileage: ${t} — ${l} ${i}`:`price: $${a} — mileage: ${t} — ${l}`}}}},scales:{x:{title:{display:!0,text:"Mileage"}},y:{title:{display:!0,text:"Price"},beginAtZero:!0,min:0}}}})}o(""),document.getElementById("trim-filter").addEventListener("change",function(){o()}),document.getElementById("year-filter").addEventListener("change",function(){o()})}function calculateMeanAndStdDev(e){let t=e.reduce((e,t)=>e+t,0)/e.length,a=e.reduce((e,a)=>e+Math.pow(a-t,2),0)/e.length;return{mean:t,stdDev:Math.sqrt(a)}}function calculateLogarithmicRegression(e,t){let a=e.length,l=0,r=0,i=0,n=0;e.forEach((e,a)=>{let o=Math.log(e),d=t[a];l+=o,r+=d,i+=o*d,n+=o*o});let o=(a*i-l*r)/(a*n-l*l),d=(r-o*l)/a;return{slope:o,intercept:d}}function predictPrice(e,{slope:t,intercept:a}){return a+t*Math.log(e)}document.addEventListener("DOMContentLoaded",initializeDepreciationChart);
