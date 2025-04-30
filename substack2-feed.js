const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://nzvc.substack.com/feed&api_key=wchntgtgmpfmftvuinc2q3daw3lczgu1ytqimofx";
const POSTS_PER_PAGE = 5;
let allPosts = [], currentPage = 1;

console.log('Substack script loaded, waiting for fetch...');

fetch(FEED_URL)
  .then(r => r.json())
  .then(data => {
    allPosts = data.items
      .filter(p => !p.enclosure)              // убираем подкасты
      .map(p => ({                           // нормализуем
        title: p.title,
        url:   p.link,
        image: p.thumbnail,
        excerpt: p.description
          .replace(/<[^>]*>/g,'').slice(0,200)+'…'
      }));
    renderPage(1);
    console.log('Rendered posts:', allPosts.length);
    renderPagination();
  })
  .catch(() => {
    document.getElementById('custom-feed')
      .textContent = 'There are no new posts right now 😞';
  });

function renderPage(page){
  currentPage = page;
  const start = (page-1)*POSTS_PER_PAGE;
  const slice = allPosts.slice(start,start+POSTS_PER_PAGE);
  const root  = document.getElementById('custom-feed');
  root.innerHTML = '';
  slice.forEach(post=>{
    root.insertAdjacentHTML('beforeend',`
      <div class="feed-post">
        ${post.image ? `<img src="${post.image}" alt="">` : ''}
        <div><h3><a href="${post.url}" target="_blank">${post.title}</a></h3>
        <p>${post.excerpt}</p></div>
      </div>`);
  });
  [...document.querySelectorAll('#pagination button')]
    .forEach(b=>b.classList.toggle('active',+b.dataset.page===page));
}
function renderPagination(){
  const total = Math.ceil(allPosts.length/POSTS_PER_PAGE);
  const pag = document.getElementById('pagination');
  pag.innerHTML = ''; if(total<=1) return;
  for(let i=1;i<=total;i++){
    pag.insertAdjacentHTML('beforeend',
      `<button data-page="${i}" ${i===currentPage?'class="active"':''}>${i}</button>`);
  }
  pag.onclick = e=>{
    if(e.target.tagName==='BUTTON') renderPage(+e.target.dataset.page);
  };
}
