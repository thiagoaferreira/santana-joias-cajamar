/* Avaliações do Google — preencha PLACE_ID (ChIJ...) da loja para ativar. Seção fica oculta enquanto vazio. */
(function(){
  var PLACE_ID = "ChIJ3QQ5Ln4dz5QRYS9W1bkNkCM";   // <-- Place ID do Cajamar (formato ChIJ...)
  var ENDPOINT = "https://pajblplxhgebssydyesb.supabase.co/functions/v1/google-reviews";
  if (!PLACE_ID || PLACE_ID.indexOf("__") === 0) return;
  fetch(ENDPOINT + "?place_id=" + encodeURIComponent(PLACE_ID))
    .then(function(r){ return r.json(); }).then(render).catch(function(){});
  function stars(n){ var f=Math.round(n||0), s=""; for(var i=1;i<=5;i++){ s+='<i class="ri-star-'+(i<=f?'fill':'line')+'"></i>'; } return s; }
  function esc(s){ return (s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function render(d){
    if(!d || !d.rating) return;
    var sec=document.getElementById('avaliacoes'); if(!sec) return;
    document.getElementById('reviewsRating').innerHTML =
      '<span class="reviews__score">'+d.rating.toFixed(1).replace('.',',')+'</span>'+
      '<span class="reviews__stars">'+stars(d.rating)+'</span>'+
      '<span class="reviews__count">'+d.total+' avaliações no Google</span>';
    document.getElementById('reviewsList').innerHTML = (d.reviews||[]).filter(function(rv){return (rv.text||'').trim();}).map(function(rv){
      var ini=(rv.author||'?').trim().charAt(0).toUpperCase();
      var av=rv.photo?'<img src="'+rv.photo+'" alt="" loading="lazy" referrerpolicy="no-referrer">':'<span>'+ini+'</span>';
      return '<article class="review"><div class="review__head"><div class="review__avatar">'+av+'</div>'+
        '<div><div class="review__author">'+esc(rv.author)+'</div><div class="review__stars">'+stars(rv.rating)+'</div></div></div>'+
        '<p class="review__text">'+esc(rv.text)+'</p><span class="review__when">'+esc(rv.when)+'</span></article>';
    }).join('');
    var hero=document.getElementById('heroRating');
    if(hero){ hero.innerHTML='<i class="ri-google-fill"></i><strong>'+d.rating.toFixed(1).replace('.',',')+'</strong><span class="hero__rating-stars">'+stars(d.rating)+'</span><span class="hero__rating-label">no Google \u00b7 '+d.total+' avalia\u00e7\u00f5es</span>'; if(d.url) hero.href=d.url; hero.hidden=false; }
    var link=document.getElementById('reviewsLink');
    if(link){ if(d.url) link.href=d.url; else link.style.display='none'; }
    sec.hidden=false;
  }
})();
