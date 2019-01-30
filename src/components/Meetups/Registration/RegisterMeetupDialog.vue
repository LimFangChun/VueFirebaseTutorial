<template>
  <v-dialog width="max-content" persistent v-model="registerDialog">
    <v-btn accent slot="activator" class="primary">{{isUserRegistered ? 'Unregister' : 'Register'}}</v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="isUserRegistered">Unregister from Meetup?</v-card-title>
            <v-card-title v-else>Register this Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can change your decision later.</v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darken-1" flat @click="registerDialog = false">Cancel</v-btn>
              <v-btn class="green--text darken-1" flat @click="onConfirm">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false
    };
  },
  computed: {
    isUserRegistered() {
      return (
        this.$store.getters.getUser.registeredMeetup.findIndex(meetupId => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    }
  },
  methods: {
    onConfirm() {
      if (this.isUserRegistered) {
        this.$store.dispatch("unregisterMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerMeetup", this.meetupId);
      }
      this.registerDialog = false;
    }
  }
};
</script>
