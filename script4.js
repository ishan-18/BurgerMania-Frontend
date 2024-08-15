// Get Cart Items
var id = JSON.parse(localStorage.getItem("user")).id;
var totalPrice = 0;
window.onload = function () {
  fetch(`http://localhost:5121/api/items/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.items.map((i) => {
        document.getElementById("cart-items").innerHTML += `
            <div class="cart-item">
              <img
                src="${i.burger.burgerImage}"
                alt="Fried Chicken"
                class="cart-img"
              />
              <div class="item-details">
                <h2>${i.burger.burgerName}</h2>
                <p>Quantity: <input type="number" value="${i.quantity}" /></p>
                <div class="item-details-flex">
                  <p>Price: ${i.burger.price}</p>
                  <button class="remove-item" id="remove-item" onclick="removeFromCart(${i.id})">Remove</button>
                </div>
              </div>
            </div>
            `;

        totalPrice += i.burger.price * i.quantity;
      });
      localStorage.setItem("cartId", data.items[0].cartId);
      document.getElementById(
        "total-price"
      ).innerHTML = `<span>Total Price:</span> ${totalPrice}`;
      document.getElementById(
        "total-items"
      ).innerHTML = `<span>Total Items:</span> ${data.items.length}`;
    });
};

// Remove item from cart
function removeFromCart(id) {
  fetch(`http://localhost:5121/api/items/remove/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    .then((data) => {
      window.location.href = "./KFCCart.html";
    });
}

// Order burgers
var cartId = localStorage.getItem("cartId");
var cart = {
  cartId,
};
document.getElementById("checkout").addEventListener("click", () => {
  fetch("http://localhost:5121/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Ordered Successfully");
      window.location.href = "KFCMenu.html"
    });
});
