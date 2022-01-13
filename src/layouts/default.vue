<template>
  <div>
    <div id="nav" class="mb-2">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">Teliae Tester</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNav" class="collapse navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NuxtLink to="/" class="nav-link">Create a label</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/raw-teliae-query" class="nav-link"> Run a Teliae query </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/snapshot" class="nav-link"> View a snapshot </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/addresses" class="nav-link"> Manage addresses </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav a.NuxtLink-exact-active {
  color: #42b983;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
