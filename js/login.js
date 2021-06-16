const url = "https://vue3-course-api.hexschool.io";

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector(".loginBtn");

function login(e) {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const user = {
    username,
    password,
  };

  axios
    .post(`${url}/admin/signin`, user)
    .then((res) => {
      if (res.data.success) {
        // const token = res.data.token;
        // const expired = res.data.expired;
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token};expires=${new Date(
          expired
        )}; path=/`;
        window.location = "products.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

loginBtn.addEventListener("click", login);

// const app = {
//   data: {
//     url: `https://vue3-course-api.hexschool.io`,
//     username: usernameInput.value,
//     password: passwordInput.value,
//     user: {
//       username,
//       password,
//     },
//   },
//   login() {
//     // e.preventDefault();
//     axios
//       .post(`${this.data.url}/admin/signin`, this.data.user)
//       .then((res) => {
//         if (res.data.success) {
//           // const token = res.data.token;
//           // const expired = res.data.expired;
//           const { token, expired } = res.data;
//           document.cookie = `hexToken=${token};expires=${new Date(
//             expired
//           )}; path=/`;
//           window.location = "products.html";
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },
//   created() {
//     loginBtn.addEventListener("click", this.login());
//   },
// };
// app.created();
