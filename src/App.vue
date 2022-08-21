<template>
  <app-header></app-header>

  <router-view></router-view>

  <app-player></app-player>
  <auth></auth>
  <!-- Auth Modal -->
</template>

<script>
import { mapWritableState } from "pinia";
import AppHeader from "./components/AppHeader.vue";
import Auth from "./components/Auth.vue";
import useUserStore from "@/stores/user";
import { auth } from "@/includes/firebase";
import AppPlayer from "./components/Player.vue";

export default {
  name: "App",
  components: { AppHeader, Auth, AppPlayer },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style></style>
