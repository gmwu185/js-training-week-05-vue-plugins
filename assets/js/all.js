"use strict";

var uuid = 'a70f537b-d0f1-4553-81bb-1767acf549d1'; // 請加入個人的 UUID

Vue.component('pagination', {
  template: "<ul class=\"pagination justify-content-end\">\n      <li class=\"page-item\" \n        :class=\"{ disabled: pages.current_page === 1 }\"\n      >\n        <a class=\"page-link\" href=\"#\" \n          @click.prevent=\"updatePage(1)\" \n          :disabled=\"{ true: pages.current_page === 1 }\"\n        >\u6700\u524D\u9801</a>\n      </li>\n      <li class=\"page-item\" \n        v-for=\"i in pages.total_pages\" \n        :key=\"i\"\n        :class=\"{ active: pages.current_page === i }\"\n      >\n        <a class=\"page-link\" href=\"#\" \n          @click.prevent=\"updatePage(i)\"\n        >{{ i }}</a>\n      </li>\n      <li class=\"page-item\"\n        :class=\"{ disabled: pages.current_page === pages.total_pages }\"\n      >\n        <a class=\"page-link\" href=\"#\" \n          @click.prevent=\"updatePage(pages.total_pages)\"\n          :disabled=\"{ true: pages.current_page === pages.total_pages }\"\n        >\u6700\u5F8C\u9801</a>\n      </li>\n    </ul>\n  ",
  props: ['pages'],
  methods: {
    updatePage: function updatePage(pageNum) {
      console.log('pagination component -> pageNum', pageNum);
      this.$emit('update-page-num', pageNum);
    }
  }
}); // UUID
// const uuid = ''; // 請加入個人的 UUID

new Vue({
  el: '#app',
  data: {
    uuid: '',
    apiPath: 'https://course-ec-api.hexschool.io/api/',
    token: '',
    user: {
      email: '',
      password: ''
    },
    products: [// {
      //   id: 1586934917210,
      //   unit: '台',
      //   category: '掌上主機',
      //   title: 'Switch',
      //   origin_price: 20000,
      //   price: 9980,
      //   description: '想玩就玩',
      //   content: '動森太好玩惹',
      //   enabled: 1,
      //   imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      // },
    ],
    tempProduct: {
      imageUrl: []
    },
    pagination: {},
    isNew: false,
    loadingBtn: ''
  },
  methods: {
    signin: function signin() {
      var _this = this;

      var api = "".concat(this.apiPath, "auth/login");
      axios.post(api, this.user).then(function (response) {
        var token = response.data.token;
        var expired = response.data.expired;
        document.cookie = "token=".concat(token, "; expires=").concat(new Date(expired * 1000), "; path=/");
        console.log('signin() -> .then() response', response);
        var jsonParseSigninMessage = JSON.parse(response.request.responseText).message;
        alert(jsonParseSigninMessage);

        if (jsonParseSigninMessage == "登入成功") {
          var confirmDashboardIndex = confirm('登入成功，是否前往後台首頁產品列頁');

          if (confirmDashboardIndex) {
            // window.location = "product.html";  // 直接導到指定頁面
            window.open('product.html', '後台首頁產品列頁'); // 已新分頁開啟頁面
          } else {
            return '';
          }

          _this.user.password = ''; // 確任項目點按後清空密碼輸入框
        }
      })["catch"](function (error) {
        // console.dir(error);
        var jsonParseResponseStr = JSON.parse(error.response.request.response);
        console.log(jsonParseResponseStr.message);
        alert(jsonParseResponseStr.message);
      });
    },
    signout: function signout() {
      // 請加入 Token
      document.cookie = "token=; expires=; path=/";
      var token = '';
      console.log('signout() -> 完成登出與清除 token 為空字串');
      alert('完成登出');
    },
    getData: function getData() {
      var _this2 = this;

      var catchPageNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      // 取得 token 的 cookies（注意取得的時間點）
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

      if (this.token == '') {
        console.log('取得資料 getData() 無法執行，token 為空字串');
      } else {
        console.log('getData -> catchPageNum', catchPageNum); // API Path

        var api = "".concat(this.apiPath).concat(this.uuid, "/admin/ec/products?page=").concat(catchPageNum); // console.log('getData() -> api', api);
        // 將 Token 加入到 Headers 內

        axios.defaults.headers.common.Authorization = "Bearer ".concat(this.token); // console.log('getData() ->  this.token', this.token);
        // Ajax

        axios.get(api).then(function (response) {
          console.log('axios.get(api) response', response);
          _this2.products = Object.assign({}, response.data.data); // console.log('this.products', this.products);

          _this2.pagination = Object.assign({}, response.data.meta.pagination);

          if (_this2.tempProduct.id) {
            _this2.tempProduct = {
              imageUrl: []
            };
            $('#productModal').modal('hide');
          }
        });
      }
    }
  },
  created: function created() {
    // 透過全域設定 uuid
    this.uuid = uuid;
    /*----------  預設執行直接向 cookie 取得 token  ----------*/

    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // 將 Token 加入到 Headers 內 - 二種寫法二選一
    // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

    axios.defaults.headers.common.Authorization = "Bearer ".concat(this.token);
    /*----------  /預設執行直接向 cookie 取得 token  ----------*/

    this.getData();
  }
});
var VeeValidateLocalize_zh_TW = {
  "code": "zh_TW",
  "messages": {
    "alpha": "{_field_} 須以英文組成",
    "alpha_dash": "{_field_} 須以英數、斜線及底線組成",
    "alpha_num": "{_field_} 須以英數組成",
    "alpha_spaces": "{_field_} 須以英文及空格組成",
    "between": "{_field_} 須介於 {min} 至 {max}之間",
    "confirmed": " {_field_} 不一致",
    "digits": "{_field_} 須為 {length} 位數字",
    "dimensions": "{_field_} 圖片尺寸不正確。須為 {width} x {height} 像素",
    "email": "{_field_} 須為有效的電子信箱",
    "excluded": "{_field_} 的選項無效",
    "ext": "{_field_} 須為有效的檔案",
    "image": "{_field_} 須為圖片",
    "oneOf": "{_field_} 的選項無效",
    "integer": "{_field_} 須為整數",
    "length": "{_field_} 的長度須為 {length}",
    "max": "{_field_} 不能大於 {length} 個字元",
    "max_value": "{_field_} 不得大於 {max}",
    "mimes": "{_field_} 須為有效的檔案類型",
    "min": "{_field_} 不能小於 {length} 個字元",
    "min_value": "{_field_} 不得小於 {min}",
    "numeric": "{_field_} 須為數字",
    "regex": "{_field_} 的格式錯誤",
    "required": "{_field_} 為必填",
    "required_if": "{_field_} 為必填",
    "size": "{_field_} 的檔案須小於 {size}KB"
  }
};
//# sourceMappingURL=all.js.map
