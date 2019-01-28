<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetup" class="info">Explore meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/createmeetup" class="info">Organize meetups</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="(item) in meetups"
            :key="item.id"
            :src="item.imageUrl"
            @click="onLoadMeetup(item.id)"
            style="cursor: pointer;"
          >
            <div class="title">{{item.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12 class="text-xs-center">
        <p>Welcome to meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  computed: {
    meetups() {
      return this.$store.getters.getLoadedMeetups;
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push(`/viewmeetup/${id}`);
    }
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  align-items: center;
  font-size: 2em;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  color: white;
}
</style>
