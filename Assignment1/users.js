let main = document.querySelector("main");
let message = document.getElementById("message");
let container = document.querySelector(".container");
let loadMoreBtn = document.getElementById("loadMore");

let allData = [];
let currentIndex = 0;
const batchSize = 20;

let displayData = () => {
  let nextBatch = allData.slice(currentIndex, currentIndex + batchSize);

  nextBatch.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";

    const imgT = document.createElement("img");
    imgT.src =
      "https://cdn.pixabay.com/photo/2024/02/08/12/54/ai-generated-8561072_1280.png";

    const paraT = document.createElement("p");
    paraT.textContent = `Name: ${element.name}`;

    card.appendChild(imgT);
    card.appendChild(paraT);
    container.appendChild(card);
  });

  currentIndex += batchSize;

  if (currentIndex >= allData.length) {
    loadMoreBtn.style.display = "none";
    message.textContent = " All users loaded!";
  } else {
    message.textContent = `Showing ${currentIndex} of ${allData.length} users`;
  }
};

let fetchData = async () => {
  try {
    message.textContent = " Fetching data, please wait...";
    let response = await fetch("https://jsonplaceholder.typicode.com/comments");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    let data = await response.json();

    if (data.length === 0) {
      message.textContent = " No data found to display.";
      return;
    }

    allData = data;
    message.textContent = " Data loaded successfully!";
    displayData();
  } catch (error) {
    console.error(error);
    message.textContent =
      " Failed to load data. Please check your internet connection and try again.";
    message.style.color = "red";
    loadMoreBtn.style.display = "none";
  }
};

loadMoreBtn.addEventListener("click", displayData);
fetchData();
