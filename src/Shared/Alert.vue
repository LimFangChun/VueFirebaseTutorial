<template>
    <v-alert error dismissible @input="onClose" :value="true">
        {{text}}
    </v-alert>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:['text'],
    methods: {
        onClose(){
            this.$emit('dismissed')
        }
    },
})
</script>

<style scope>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
