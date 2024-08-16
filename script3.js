//get menu items
var id = JSON.parse(localStorage.getItem("user")).id;
var userRole = JSON.parse(localStorage.getItem("user")).userRole;
window.onload = function () {
  fetch("http://localhost:5121/api/burger", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.burger.map((d) => {
        var buttonHtml = "";
        if (userRole === "Admin") {
          buttonHtml = `
            <button class="add-to-cart" onclick="editBurger(${d.id})">Edit</button>
            <button class="add-to-cart" onclick="deleteBurger(${d.id})">Delete</button>
          `;
        } else {
          buttonHtml = `
          <input type="number" id="quantity-${d.id}" placeholder="Enter the Quantity" min=1/>
            <button class="add-to-cart" id="add-to-cart" onclick="addToCart(${id}, ${d.id})">Add to Cart</button>
          `;
        }
        document.getElementById("menu-items").innerHTML += `
        <div class="menu-item">
            <img
              src="${d.burgerImage}"
              alt="${d.burgerName}"
            />
            <h3>${d.burgerName}</h3>
            <p>${d.burgerDesc}</p>
            <p>${d.price}</p>
            
            ${buttonHtml}
        </div>
        `;
      });
    });
};

// Add to Cart
function addToCart(id, burgerId) {
  var burger = {
    burgerId,
    quantity: document.getElementById(`quantity-${burgerId}`).value,
  };
  fetch(`http://localhost:5121/api/items/add/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(burger),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(`Burger added to cart`);
    });
}

// Edit Burger
function editBurger(burgerId) {
  var modal = document.getElementById("editModal");
  var closeButton = document.getElementsByClassName("close-button")[0];

  fetch(`http://localhost:5121/api/burger/${burgerId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("burgerName").value = data.burgerName;
      document.getElementById("burgerDesc").value = data.burgerDesc;
      document.getElementById("price").value = data.price;
      document.getElementById("burgerImage").value = data.burgerImage;
      document.getElementById("burgerCategory").value = data.burgerCategory;
    });

  modal.style.display = "block";

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var form = document.getElementById("editForm");
  form.onsubmit = function (event) {
    event.preventDefault();

    var updatedBurger = {
      id: burgerId,
      burgerName: document.getElementById("burgerName").value,
      burgerDesc: document.getElementById("burgerDesc").value,
      price: parseFloat(document.getElementById("price").value),
      burgerImage: document.getElementById("burgerImage").value,
      burgerCategory: document.getElementById("burgerCategory").value,
    };

    fetch(`http://localhost:5121/api/burger/${burgerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedBurger),
    })
      .then((res) => res.json())
      .then((data) => {
        modal.style.display = "none";
        window.location.href = "./KFCMenu.html";
      });
  };
}

// Delete Burger
function deleteBurger(burgerId) {
  fetch(`http://localhost:5121/api/burger/${burgerId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res)
    .then((data) => {
      window.location.href = "./KFCMenu.html";
    });
}

// Add Burger
if (userRole == "Admin") {
  var addButton = document.createElement("button");
  addButton.textContent = "Add";
  addButton.id = "add-button";
  addButton.addEventListener("click", openAddModal);
  var li = document.createElement("li");
  li.appendChild(addButton);
  document.getElementById("button-list").appendChild(li);
}

function openAddModal() {
  var modal = document.getElementById("addModal");
  modal.style.display = "block";
}

function closeAddModal() {
  var modal = document.getElementById("addModal");
  modal.style.display = "none";
}

document.getElementById("addForm").onsubmit = function (event) {
  event.preventDefault();

  var newBurger = {
    burgerName: document.getElementById("newBurgerName").value,
    burgerDesc: document.getElementById("newBurgerDesc").value,
    price: parseFloat(document.getElementById("newPrice").value),
    burgerImage: document.getElementById("newBurgerImage").value,
    burgerCategory: document.getElementById("newBurgerCategory").value,
  };

  fetch(`http://localhost:5121/api/burger`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newBurger),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      closeAddModal();
      alert("Burger added successfully!");
      window.location.href = "./KFCMenu.html";
    })
    .catch((error) => {
      console.error("Error adding burger:", error);
      alert("There was an error adding the burger.");
    });
};
