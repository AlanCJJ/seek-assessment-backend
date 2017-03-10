<template lang="html">
    <div>
        <h1>{{title}}</h1>
        <hr>
        <form id="update-ads" name="update-ads" action="/ads/update" method="POST">
          <div class="form-group">
            <input type="text" class="hidden" id="id" name="id" :value="id"/>
          </div>
          <div class="form-group">
            <label for="name">Advertisement Name: </label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Advertisement Name" :value="name"/>
          </div>
          <br>
          <div class="form-group">
            <label for="price">Price ( $ ): </label>
            <input type="text" class="form-control" id="price" name="price" placeholder="Price" :value="price"/>
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
