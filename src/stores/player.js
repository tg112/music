import { Howl } from "howler";
import { defineStore } from "pinia";
import helper from "../includes/helper";

export default defineStore("player", {
  stete: () => ({
    current_song: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  }),
  actions: {
    async newSong(song) {
      this.current_song = song;
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();

      this.sound.on("play", () => {
        requestAnimationFrame(this.progress);
      });
    },
    async toggleAudio() {
      if (!this.sound.playing) {
        return;
      }
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return;
      }

      const { x, width } = event.currentTarget.getBoundingClientRect();

      // Document = 2000, timeline = 1000, client = 1000, Distance = 500
      const clikcX = event.clientX - x;
      const percentage = clikcX / width;
      const seconds = this.sound.duration() * percentage;
      this.sound.seek(seconds);
      this.sound.once("seek", this.progress);
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound && state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
});
