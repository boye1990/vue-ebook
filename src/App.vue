<template>
  <div id="app">
    <div class="fontStyle">ABCDE</div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fontStyle {
  font-family: 'Days One';
  color: orange;
  font-size: 40px;
}
</style>
