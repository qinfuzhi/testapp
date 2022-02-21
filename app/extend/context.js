'use strict';
const crypto = require('crypto');
// const { app } = require('egg-mock/bootstrap');

module.exports = {
  // api返回成功
  apiSuccess(data = '', msg = 'ok', code = 200) {
    this.body = {
      msg,
      data,
    };
    this.status = code;
  },
  // api返回失败
  apiFail(data = '', msg = '', code = 400) {
    this.body = {
      msg,
      data,
    };
    this.status = code;
  },
  // 渲染404页面
  async pageFail(data = '', code = 404) {
    return await this.render('admin/common/404.html', {
      data, code,
    });
  },
  // 分页
  async page(modeName, where = {}, options = {}) {
    // 获取页码和条数
    const page = this.query.page ? parseInt(this.query.page) : 1;
    const limit = this.query.limit ? parseInt(this.query.limit) : 10;
    const offset = (page - 1) * limit;
    if (!options.order) {
      options.order = [
        [ 'id', 'DESC' ],
      ];
    }
    const res = await this.app.model[modeName].findAndCountAll({
      where,
      offset, limit,
      ...options,
    });

    let query = { ...this.query };
    if (query.hasOwnProperty('page')) {
      delete query.page;
    }
    if (query.hasOwnProperty('limit')) {
      delete query.limit;
    }

    const urlEncode = (param, key, encode) => {
      if (param == null) return '';
      let paramStr = '';
      const t = typeof (param);
      if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
      } else {
        for (const i in param) {
          const k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
          paramStr += urlEncode(param[i], k, encode);
        }
      }
      return paramStr;
    };
    query = urlEncode(query);
    console.log(query);
    // 总页数
    const totalPage = Math.ceil(res.count / limit);
    let pageEl = '';
    for (let index = 1; index <= totalPage; index++) {
      let active = '';
      if (page === index) {
        active = 'active';
      }
      pageEl += `
      <li class="page-item ${active}"><a class="page-link " href="?page=${index}&limit=${limit}${query}">${index}</a></li>
      `;
    }

    const preDisabled = page <= 1 ? 'disabled' : '';
    const nextDisabled = page >= totalPage ? 'disabled' : '';
    const pageRender = `
            <ul class="pagination">
            <li class="page-item ${preDisabled}" >
            <a class="page-link" href="?page=${page - 1}&limit=${limit}${query}" aria-label="Previous">
                <span aria-hidden="true">«</span>
                <span class="sr-only">Previous</span>
            </a>
            </li>
            ${pageEl}
            <li class="page-item ${nextDisabled}" >
            <a class="page-link" href="?page=${page + 1}&limit=${limit}${query}" aria-label="Next">
                <span aria-hidden="true">»</span>
                <span class="sr-only">Next</span>
            </a>
            </li>
        </ul>
    `;
    this.locals.pageRender = pageRender;
    return res.rows;
  },
  // 渲染公共模版
  async renderTemplate(param = {}) {
    const toast = this.cookies.get('toast', {
      encrypt: true,
    });
    param.toast = toast ? JSON.parse(toast) : null;
    await this.render('admin/common/template.html', param);
  },
  // 消息提示
  toast(msg, type = 'danger') {
    this.cookies.set('toast', JSON.stringify({
      msg, type,
    }), {
      maxAge: 1500,
      encrypt: true,
    });
  },
  // 密码验证
  checkPassword(password, hash_password, app) {
    const hmac = crypto.createHash('sha256', app.config.crypto.secret);
    hmac.update(password);
    password = hmac.digest('hex');
    const res = password === hash_password;
    if (!res) {
      this.throw(400, '密码错误');

    }
    return true;
  },
};
