var o=document.querySelector("#comments"),m=document.querySelector("#comments-placeholder"),a=o.getAttribute("data-comments-id"),i=new IntersectionObserver((n,c)=>{n.forEach(async t=>{if(t.isIntersecting){let{fetchComments:r,renderComments:s}=await import("./comments.utils-OU4BLNIZ.mjs");try{let e=await r(a);s(e)}catch(e){m.innerHTML=e.message}c.unobserve(t.target)}})},{rootMargin:"200px 0px 0px 0px"});i.observe(o);