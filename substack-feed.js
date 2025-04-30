/* substack-feed.js */
const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://nzvc.substack.com/feed&api_key=wchntgtgmpfmftvuinc2q3daw3lczgu1ytqimofx";
const POSTS_PER_PAGE = 5;
let posts = [], page = 1;

/* загрузка, фильтрация, рендер — как в вашем примере */
