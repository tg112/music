<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload"></app-upload>
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <composition-item
            v-for="(song, i) in songs"
            :key="song.docID"
            :song="song"
            :updateSong="updateSong"
            :index="i"
          ></composition-item>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CompositionItem from "../components/CompositionItem.vue";
import AppUpload from "../components/Upload.vue";

import { songsCollection, auth } from "../includes/firebase";

export default {
  components: { AppUpload, CompositionItem },
  data() {
    return {
      songs: [],
    };
  },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();
    snapshot.forEach((doc) => {
      const song = {
        ...doc.data(),
        docID: doc.id,
      };
      this.songs.push(song);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.upload.cancelUploads();
    next();
  },
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore();
  //   if (store.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
  },
};
</script>

<style></style>
