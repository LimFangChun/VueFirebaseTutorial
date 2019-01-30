<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h5 class="primary--text">{{meetup.title}}</h5>
            <template v-if="isCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-dialog :meetup="meetup"></app-edit-meetup-dialog>
            </template>
          </v-card-title>

          <v-img :src="meetup.imageUrl" height="400px"></v-img>

          <v-card-text>
            <div class="info--text">{{meetup.date | date}} - {{meetup.location}}</div>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="isCreator"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="isCreator"></app-edit-meetup-time-dialog>
            </div>
            <div>{{meetup.description}}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-meetup-dialog :meetupId="meetup.id" v-if="isUserAuthenticated && !isCreator"></app-register-meetup-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.getLoadedMeetup(this.id);
    },
    isUserAuthenticated() {
      return (
        this.$store.getters.getUser !== null &&
        this.$store.getters.getUser !== undefined
      );
    },
    isCreator() {
      if (!this.isUserAuthenticated) {
        return false;
      }
      return this.$store.getters.getUser.id === this.meetup.creatorId;
    }
  }
};
</script>
