Vue.component('pagination', {
  template: `<ul class="pagination justify-content-end">
      <li class="page-item" 
        :class="{ disabled: pages.current_page === 1 }"
      >
        <a class="page-link" href="#" 
          @click.prevent="updatePage(1)" 
          :disabled="{ true: pages.current_page === 1 }"
        >最前頁</a>
      </li>
      <li class="page-item" 
        v-for="i in pages.total_pages" 
        :key="i"
        :class="{ active: pages.current_page === i }"
      >
        <a class="page-link" href="#" 
          @click.prevent="updatePage(i)"
        >{{ i }}</a>
      </li>
      <li class="page-item"
        :class="{ disabled: pages.current_page === pages.total_pages }"
      >
        <a class="page-link" href="#" 
          @click.prevent="updatePage(pages.total_pages)"
          :disabled="{ true: pages.current_page === pages.total_pages }"
        >最後頁</a>
      </li>
    </ul>
  `,
  props: ['pages'],
  methods: {
    updatePage( pageNum ) {
      console.log('pagination component -> pageNum', pageNum);
      this.$emit('update-page-num', pageNum)
    }
  }
});