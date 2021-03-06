const app = {
  data: {
    apiUrl: "https://vue3-course-api.hexschool.io",
    apiPath: "yangalice212",
    productData: [],
  },
  getData() {
    const url = `${this.data.apiUrl}/api/${this.data.apiPath}/admin/products`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          this.data.productData = res.data.products;
          this.render();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  render() {
    const productList = document.querySelector("#productList");
    const countProduct = document.querySelector("#productCount");
    let str = "";
    this.data.productData.forEach((item) => {
      str += `
      <tr>
        <td>${item.category}</td>
        <td>NT$ ${item.origin_price}</td>
        <td>NT$ ${item.price}</td>
        <td>
          <input type="checkbox" id="${item.id}" ${
        item.is_enabled ? "checked" : ""
      } data-id="${item.id}" data-action="status">
          <label for="${item.id}">${item.is_enabled ? "啟用" : "未啟用"}</label>
        </td>
        <td>
          <a href="#" class="text-danger">
            <i class="fas fa-trash-alt" id="delete" data-action="remove" data-id="${
              item.id
            }"></i>
          </a>
        </td>
      </tr>
    `;
    });
    productList.innerHTML = str;
    countProduct.textContent = this.data.productData.length;

    const delBtn = document.querySelectorAll("#delete");
    delBtn.forEach((item) => {
      item.addEventListener("click", this.delProductItem.bind(this));
    });
  },
  delProductItem(e) {
    const { id } = e.target.dataset;
    const url = `${this.data.apiUrl}/api/${this.data.apiPath}/admin/product/${id}`;
    axios
      .delete(url)
      .then((res) => {
        if (res.data.success) {
          this.getData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    this.getData();
  },
};
app.created();
