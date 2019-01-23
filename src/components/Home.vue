<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetup" class="info">Explore meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="info">Organize meetups</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="(item) in meetups" :key="item.id" :src="item.imageUrl">
            <div class="title">{{item.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Welcome to meetups</p>
      </v-flex>  
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
  methods: {}
})
export default class Home extends Vue {
  data() {
    return {
      meetups: [
        {
          imageUrl:
            "http://scandinavianlibrary.org/wp-content/uploads/2017/11/IMG_0735-1-e1511040507716.jpg",
          id: "123",
          title: "Meetup at library"
        },
        {
          imageUrl:
            "http://scandinavianlibrary.org/wp-content/uploads/2017/11/IMG_0735-1-e1511040507716.jpg",
          id: "121",
          title: "Meetup at a"
        }
      ]
    };
  }
}
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
