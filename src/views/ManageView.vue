<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addSong="addSong"></app-upload>
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t("manage.song") }}</span>
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
            :removeSong="removeSong"
            :updateUnsavedFlag="updateUnsavedFlag"
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
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();
    snapshot.forEach(this.addSong);
  },
  beforeRouteLeave(to, from, next) {
    // this.$refs.upload.cancelUploads();
    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = confirm(
        "You have unsaved changes. Are you sure want to leave?"
      );
      next(leave);
    }
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
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(doc) {
      const song = {
        ...doc.data(),
        docID: doc.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
};
</script>

<style></style>
