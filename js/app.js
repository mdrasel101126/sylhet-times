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
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  } catch (error) {
    console.log(error);
  }
};

const getValue = (value) => {
  if (value !== null) {
    return value;
  }
  return "Unknown";
};
const getView = (value) => {
  value = parseInt(value);
  // console.log(value);
  if (value >= 0) {
    return value;
  } else {
    return "Unknown";
  }
};

const displayNews = (allNews) => {
  console.log(allNews);
  const newsNumber = document.getElementById("news-number");
  newsNumber.innerText = `Total ${allNews.length} news found`;
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  allNews.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  allNews.forEach((news) => {
    //console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="row g-3 bg-white rounded my-3 shadow">
    <div class="col-sm-12 col-lg-4 p-2">
        <img class="img-fluid  rounded" src=${news.image_url} alt="">
    </div>
    <div class="col-sm-12 col-lg-8 p-2">
        <h4>${news.title}</h4>
        <p class="text-black-50">${
          news.details.length > 400
            ? news.details.slice(0, 400) + "..."
            : news.details
        }</p>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gx-5 mt-3 w-100">
            <div class="d-flex">
                <div class="align-self-center">
                    <img class="author-image" src=${news.author.img} alt="">
                </div>
                <div class="mx-1 align-self-center">
                    <span>${
                      news.author.name
                        ? getValue(news.author.name)
                        : "Unknown Author"
                    }</span>
                    <p class="text-black-50">${
                      news.author.published_date
                        ? getValue(news.author.published_date)
                        : "Unknown Date"
                    }</p>
                </div>
            </div>
            <div class="text-center align-self-center">
               <p><span><i class="fa-regular fa-eye"></i></span><span> ${getView(
                 news.total_view
               )} Views</span></p>
            </div>
            <div class="text-center align-self-center">
                <p>Rating: ${news.rating.number}</p>
            </div>
            <div class="text-center align-self-center">
                <button onclick="loadDetails('${
                  news._id
                }')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailModal">Details</button>
            </div>
        </div>
    </div>
  </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
  toggleSpinner(false);
};

const loadDetails = async (newId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};
const displayDetails = (detail) => {
  console.log(detail);
  const showDetailModalLabel = document.getElementById("showDetailModalLabel");
  const modalBody = document.getElementById("modal-body");
  const publishedDate = document.getElementById("published-date");
  showDetailModalLabel.innerText = detail.title;
  modalBody.innerText = detail.details;
  publishedDate.innerText = detail.author.published_date
    ? detail.author.published_date
    : "Unknown Date";
};

const toggleSpinner = (isLoading) => {
  const spinnerDiv = document.getElementById("spinner");
  if (isLoading) {
    spinnerDiv.classList.remove("d-none");
  } else {
    spinnerDiv.classList.add("d-none");
  }
};

loadNewsCategories();
