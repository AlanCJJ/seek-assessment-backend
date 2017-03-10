<template lang="html">
    <div>
        <h1 class="col-sm-11">Rules Listing</h1>
        <span class="col-sm-1 h1"><a class="btn-back-outline" v-bind:href="'/'" > &laquo; Back</a></span>
        <p>
          <a class="btn-create-outline" v-bind:href="'./create-rules'">Create New Rule</a>
        </p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Type</th>
              <th>Condition</th>
              <th>Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rule, index) in rules">
              <td>{{index + 1}}</td>
              <td>{{rule.id}}</td>
              <td>Type {{rule.type}}: {{rule.name}}</td>
              <td v-html="rule.condition">{{rule.condition}}</td>
              <td>{{rule.result}}</td>
              <td>
                <a class="btn-edit-outline" v-bind:href="'./update-form?id=' + rule.id" ><i class="glyphicon glyphicon-pencil"></i></a>
                <a class="btn-delete-outline" v-bind:href="'./delete?id=' + rule.id" ><i class="glyphicon glyphicon-trash"></i></a>
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
