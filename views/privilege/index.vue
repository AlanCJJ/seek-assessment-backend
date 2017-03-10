<template lang="html">
    <div>
        <h1 class="col-sm-11">Privilege Listing</h1>
        <span class="col-sm-1 h1"><a class="btn-back-outline" v-bind:href="'/'" > &laquo; Back</a></span>
        <p>
          <a class="btn-create-outline" v-bind:href="'./create-privilege'">Create New Privilege</a>
        </p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Advertisement ID</th>
              <th>Rule ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, index) in privileges">
              <td>{{index + 1}}</td>
              <td>{{p.id}}</td>
              <td>{{p.customer_id}}</td>
              <td>{{p.ads_id}}</td>
              <td>{{p.rules_id}}</td>
              <td>
                <a class="btn-edit-outline" v-bind:href="'./update-form?id=' + p.id" ><i class="glyphicon glyphicon-pencil"></i></a>
                <a class="btn-delete-outline" v-bind:href="'./delete?id=' + p.id" ><i class="glyphicon glyphicon-trash"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
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
