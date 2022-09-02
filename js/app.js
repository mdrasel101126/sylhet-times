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

const displayNews = (news) => {
  console.log(news);
  const newsNumber = document.getElementById("news-number");
  newsNumber.innerText = `Total ${news.length} news found`;
};

loadNewsCategories();
