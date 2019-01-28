<template>
  <v-dialog width="200px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row v-if="isLoading">
          <v-flex xs12 sm6 class="text-xs-center text-sm-right">
            <v-progress-circular indeterminate color="primary" :width="7" :size="50"></v-progress-circular>
          </v-flex>
        </v-layout>

        <v-layout row wrap v-else>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="title" label="Title" id="title" required v-model="title"></v-text-field>

              <v-textarea
                name="description"
                label="Desciption"
                id="description"
                v-model="description"
                required
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["meetup"],
  data() {
    return {
      title: this.meetup.title,
      description: this.meetup.description,
      editDialog: false
    };
  },
  computed: {
    isLoading(): any {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
      onSave(){
          if(this.title.trim() === '' || this.description.trim() === ''){
              return;
          }
          this.editDialog = false;

          //save changes
          const updatedMeetup = {
              id: this.meetup.id,
              title: this.title,
              description: this.description
          }
          this.$store.dispatch('updateMeetup', updatedMeetup)
      }
  }
});
</script>

<style scoped>
</style>
