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
      <form id="create-privilege" name="create-privilege" action="/privileges/create" method="POST">
        <div class="form-group">
          <label for="cid">Customer: </label>
          <select class="form-control" id="cid" name="cid">
            <option v-for="cust in customers" :value="cust.id">( {{cust.id}} ) {{cust.name}}</option>
            <!-- <option v-for="cust in customers">{{cust.id}}</option> -->
          </select>
        </div>
        <br>
        <div class="form-group">
          <label for="aid">Advertisement: </label>
          <select  class="form-control" id="aid" name="aid">
            <option v-for="ad in ads" :value="ad.id">( {{ad.id}} ) {{ad.name}}</option>
            <!-- <option v-for="ad in ads">{{ad.id}}</option> -->
          </select>
        </div>
        <br>
        <div class="form-group">
          <label for="rid">Rule: </label>
          <select  class="form-control" id="rid" name="rid">
            <option v-for="rule in rules" :value="rule.id">( {{rule.id}} ) {{rule.name}}</option>
            <!-- <option v-for="rule in rules" :id="rule.id">{{rule.id}}</option> -->
          </select>
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
