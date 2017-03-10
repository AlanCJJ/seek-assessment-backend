<template lang="html">
    <div>
        <h1 class="col-sm-11">Advertisement Listing</h1>
        <span class="col-sm-1 h1"><a class="btn-back-outline" v-bind:href="'/'" > &laquo; Back</a></span>
        <p>
          <a class="btn-create-outline" v-bind:href="'./create-ads'">Create New Advertisement</a>
        </p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ad, index) in ads">
              <td>{{index + 1}}</td>
              <td>{{ad.id}}</td>
              <td>{{ad.name}}</td>
              <td>{{ad.price}}</td>
              <td>
                <a class="btn-edit-outline" v-bind:href="'./update-form?id=' + ad.id" ><i class="glyphicon glyphicon-pencil"></i></a>
                <a class="btn-delete-outline" v-bind:href="'./delete?id=' + ad.id" ><i class="glyphicon glyphicon-trash"></i></a>
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
