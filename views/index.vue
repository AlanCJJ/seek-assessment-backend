<template lang="html">
  <div>
    <h1 style="text-align: center;">{{title}}</h1>
    <br>
    <hr>
    <!-- <div class="row" style="align-content: center;"> -->
      <a v-for="menu in menus" :href="menu.url">
        <div class="col-lg-5 menu-button">
          <p style="text-align: center; color:#000000; font-size:60px; padding-top:40px;">
            <i :class="menu.icon"></i>
          </p>
          <h4>{{menu.menu}}</h4>
        </div>
      </a>
    <!-- </div> -->
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
