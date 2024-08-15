//Signup code
document.getElementById("signup-button").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const mobileNumber = document.getElementById("mobilenumber").value;
  const password = document.getElementById("password").value;
 
  var user = {
    username: username,
    mobileNumber: mobileNumber,
    password: password,
    userRole: "User",
  };
  fetch("http://localhost:5121/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = "./KFC.html"
    });
});
