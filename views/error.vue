<!-- extends layout

block content
  h1= message
  h2= error.status
  pre #{error.stack} -->

<template lang="html">
    <div>
      <h1>{{ status }}</h1>
      <h3> {{ msg }} </h3>
      <p> {{ stack }}</p>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
        }
    }
}
</script>

<style lang="css">
</style>
