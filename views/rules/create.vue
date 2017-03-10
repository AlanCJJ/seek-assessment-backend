<template lang="html">
    <div>
      <div>
        <h1 class="col-sm-11">{{title}}</h1>
        <span class="col-sm-1 h1"><a class="btn-back-outline" v-bind:href="'./index'" > &laquo; Back</a></span>
      </div>
      <br>
      <br>
      <br>
      <hr>
      <p v-if="err" class="errMsg">{{errMsg}}</p>
      <form id="create-rules" name="create-rules" action="/rules/create" method="POST">
        <div class="form-group">
          <label for="type">Type: </label>
          <select v-model="selected" class="form-control" id="type" name="type" >
            <option v-for="type in types" :value="type.type">{{type.name}}</option>
          </select>
        </div>

        <!-- Condition for Type 1 -->
        <div v-if="selected == 1" class="form-group">
          <label for="condition">Condition: </label>
          <input type="text" class="form-control" id="condition" name="condition" placeholder="Condition"/>
        </div>

        <!-- Condition for Type 2 -->
        <div v-if="selected == 2" class="form-group">
          <input type="text" class="hidden" id="condition" name="condition" :value="'No Condition'"/>
        </div>

        <!-- Condition for Type 3 -->
        <div v-if="selected == 3" class="form-group">
          <label for="condition">Condition: </label>
          <div>
            <span class="col-sm-2" style="padding-left:0px;padding-right:0px;">
              <select v-model="expSelected" class="form-control" id="condition" name="condition">
                <option v-for="exp in expressions" v-html="exp">{{ exp }}</option>
              </select>
            </span>
            <span class="col-sm-10" style="padding-left:0px;padding-right:0px;">
              <input v-model="condition" type="text" class="form-control" id="condition" name="condition" placeholder="Condition"/>
            </span>
          </div>
        </div>

        <br>
        <div class="form-group">
          <label for="result">Result: </label>
          <input type="text" class="form-control" id="result" name="result" placeholder="Result"/>
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
