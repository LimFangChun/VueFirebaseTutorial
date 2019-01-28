<template>
  <v-dialog width="max-content" persistent v-model="editDialog">
    <v-btn accent slot="activator">Edit time</v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="time" style="width: 100%" actions>
              <template>
                <v-btn class="blue--text darken-1" flat @click.native="editDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" flat @click.native="onSave">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props:['meetup'],
    data() {
        return {
            editDialog: false,
            time: new Date(this.meetup.date)
        }
    },
    methods: {
        onSave(){
            const newDate = new Date(this.meetup.date)
            const hours = this.time.match(/^(\d+)/)[1];
            const minutes = this.time.match(/:(\d+)/)[1];
            newDate.setHours(hours);
            newDate.setMinutes(minutes);

            const updateMeetup = {
                id: this.meetup.id,
                date: newDate
            }
            this.$store.dispatch('updateMeetup', updateMeetup)
            this.editDialog = false
        }
    },
}
</script>
