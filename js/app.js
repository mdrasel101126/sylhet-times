const loadNewsCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategories(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

const displayNewsCategories = (categories) => {
  console.log(categories);
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("mx-3");
    categoryDiv.classList.add("pointer-cursor");
    categoryDiv.innerHTML = `
       <p onclick="loadNews('${category.category_id}')">${category.category_name}</p>
    `;
    categoriesContainer.appendChild(categoryDiv);
  });
};

const loadNews = async (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayNews = (allNews) => {
  console.log(allNews);
  const newsNumber = document.getElementById("news-number");
  newsNumber.innerText = `Total ${allNews.length} news found`;
  const newsContainer = document.getElementById("news-container");
  allNews.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  allNews.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="row g-3 bg-white rounded my-3 shadow">
    <div class="col-4 p-2">
        <img class="img-fluid  rounded" src=${news.image_url} alt="">
    </div>
    <div class="col-8 p-2">
        <h4>${news.title}</h4>
        <p class="text-black-50">${
          news.details.length > 400
            ? news.details.slice(0, 400) + "..."
            : news.details
        }</p>
        <div class="row row-cols-4 gx-5 mt-3 w-100">
            <div class="d-flex">
                <div class="align-self-center">
                    <img class="author-image" src=${news.author.img} alt="">
                </div>
                <div class="mx-1 align-self-center">
                    <span>${news.author.name}</span>
                    <p class="text-black-50">${news.author.published_date}</p>
                </div>
            </div>
            <div class="text-center align-self-center">
               <p><span><i class="fa-regular fa-eye"></i></span><span> ${
                 news.total_view
               } Views</span></p>
            </div>
            <div class="text-center align-self-center">
                <p>Rating: ${news.rating.number}</p>
            </div>
            <div class="text-center align-self-center">
                <button type="button" class="btn btn-primary">Details</button>
            </div>
        </div>
    </div>
  </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
};

loadNewsCategories();
