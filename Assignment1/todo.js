let table = document.querySelector(".tab");
let tbody = document.createElement("tbody");
let messageBox = document.createElement("div");
messageBox.style.textAlign = "center";
messageBox.style.margin = "1rem 0";
messageBox.style.fontWeight = "600";
messageBox.style.fontSize = "1.1rem";
document.querySelector("main").prepend(messageBox);

let fetchData = async () => {
  try {
    messageBox.textContent = " Fetching data, please wait...";
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    let data = await response.json();

    if (data.length === 0) {
      messageBox.textContent = " No data available to display.";
      return;
    }

    messageBox.textContent = " Data loaded successfully!";

    data.forEach((element) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${element.userId}</td>
        <td>${element.title}</td>
        <td style="color: ${element.completed ? "green" : "red"}">
          ${element.completed ? "Completed" : "Pending"}
        </td>
        <td><button>Edit</button></td>
        <td><button>Delete</button></td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
  } catch (error) {
    console.error(error);
    messageBox.textContent =
      " Failed to load data. Please check your internet connection or try again later.";
    messageBox.style.color = "red";
  }
};

fetchData();
