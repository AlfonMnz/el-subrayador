<template>
  <div class="home">
    <div class="buttons">
      <button class="gradient" v-on:click="createNote()">
        Crear nota
      </button>
      <button class="gradient" v-on:click="getNote()">
        Compartir
      </button>
    </div>
  </div>
</template>

<script>

import chromeService from '@/services/chromeService';
import localStorageService from '@/services/localStorageService';
export default {
  name: 'MainView',
  components: {
    
  },
  methods: {
    async createNote() {
      const tab = await chromeService.getCurrentTab();
      const selection = await chromeService.getSelection(tab.id);
      const notes = await localStorageService.getItem('notes');

      notes.push({
        url: tab.url,
        content: selection
      });
      localStorageService.setItem('notes',notes);
      await chromeService.executeScript(tab.id, () => {console.log('this is a test')});
    },
    async getNote() {
      const test = localStorageService.getItem('')
      console.log(test);
    }
  },
  async created() {
    await localStorageService.setItem('notes', []);
  }
}
</script>
<style lang="scss" scoped>
.home {
  max-height: 200px;
  width: 200px;
  background: rgb(251,140,181);
  background: linear-gradient(90deg, rgba(251,140,181,1) 0%, rgba(248,230,144,1) 62%);
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100px;
  }
  .gradient {
    width: 85%;
    border-radius: 6%;
    border: 1px solid #d6756a;
    position: relative;
    background-image: linear-gradient(90deg, rgba(249,72,151,1) 0%, rgba(243,215,77,1) 62%);
    z-index: 1;
  }

  .gradient::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(270deg, rgba(249,72,151,1) 0%, rgba(243,215,77,1) 62%);
    z-index: -1;
    transition: opacity 0.5s linear;
    opacity: 0;
  }

  .gradient:hover::before {
    opacity: 1;
  }
  
}
</style>