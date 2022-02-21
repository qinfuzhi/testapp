// eslint-disable-next-line strict, no-undef
Vue.component('toast', {
  template: `
  <div v-if='toast' class="alert" :class='c' style = "position:fixed; right:0;top:70px;z-index:9999;" role="alert">{{ msg }}</div>
  `,
  data() {
    return {
      msg: '',
      toast: false,
      timer: null,
      type: 'danger',
    };
  },
  computed: {
    c() {
      return 'alert-' + this.type;
    },
  },
  methods: {
    show(ops) {
      this.msg = ops.msg || '提示';
      this.type = ops.type || 'danger';
      this.toast = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.hide();
        this.timer = null;
        if (ops.success && typeof ops.success === 'function') {
          ops.success();
        }
      }, ops.delay || 1500);
    },
    hide() {
      this.toast = false;
    },
  },
});


// eslint-disable-next-line no-undef
Vue.component('modal', {
  template: `
  <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">{{title}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       {{content}}
      </div>
      <div class="modal-footer">
        <button @click='hide' type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button @click='confirm' type="button" class="btn btn-primary">确定</button>
      </div>
    </div>
  </div>
</div>
    `,
  data() {
    return {
      title: '提示',
      content: '',
      success: null,
    };
  },

  methods: {
    show(ops) {
      this.title = ops.title || '提示';
      this.content = ops.content;
      this.success = ops.success || null;
      // eslint-disable-next-line no-undef
      $('#staticBackdrop').modal('show');
    },
    hide() {
      // eslint-disable-next-line no-undef
      $('#staticBackdrop').modal('hide');
    },
    confirm() {
      if (this.success && typeof this.success === 'function') {
        this.success();
      }
      this.hide();
    },
  },
});
