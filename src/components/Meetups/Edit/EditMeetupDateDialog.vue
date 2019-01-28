<template>
  <v-dialog width="max-content" persistent v-model="editDialog">
    <v-btn accent slot="activator">Edit date</v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="date" style="width: 100%" actions>
              <template>
                <v-btn class="blue--text darken-1" flat @click.native="editDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" flat @click.native="onSave">Save</v-btn>
              </template>
            </v-date-picker>
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
            date: new Date(this.meetup.date).toISOString().substr(0, 10)
        }
    },
    methods: {
        onSave(){
            const newDate = new Date(this.meetup.date)
            const newDay = new Date(this.date).getUTCDate()
            const newMonth = new Date(this.date).getUTCMonth()
            const newYear = new Date(this.date).getUTCFullYear()

            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)

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
