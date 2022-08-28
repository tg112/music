<template>
  <div class="about">
    <h1>{{ $t("about.description") }}</h1>
    <base-button></base-button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
