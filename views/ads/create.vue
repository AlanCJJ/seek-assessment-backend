<template lang="html">
    <div>
       <!-- style="font-weight:bold; font-size:36px;" -->
      <div>
        <h1 class="col-sm-11">{{title}}</h1>
        <span class="col-sm-1 h1"><a class="btn-back-outline" v-bind:href="'./index'" > &laquo; Back</a></span>
      </div>
      <br>
      <br>
      <br>
      <hr>
      <p v-if="err" class="errMsg">{{errMsg}}</p>
      <form id="create-ads" name="create-ads" action="/ads/create" method="POST">
        <div class="form-group">
          <label for="name">Advertisement Name: </label>
          <input type="text" class="form-control" id="name" name="name" placeholder="Advertisement Name"/>
        </div>
        <br>
        <div class="form-group">
          <label for="price">Price ( $ ): </label>
          <input type="text" class="form-control" id="price" name="price" placeholder="Price"/>
        </div>
        <br>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
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
