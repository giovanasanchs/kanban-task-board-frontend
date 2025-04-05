<template>
  <div id="app">
    <header class="app-header">
      <h1>Nexum Kanban</h1>
    </header>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.app-header {
  background-color: #3b82f6;
  color: white;
  padding: 16px 32px;
  text-align: center;
}
</style>