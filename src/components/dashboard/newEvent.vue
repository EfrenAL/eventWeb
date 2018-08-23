<template>
  <div id="newEvent">
    <div class="event-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="name">Name</label>
          <input
                  type="text"
                  id="name"
                  v-model="name">
        </div>
        <div class="input">
          <label for="description">Description</label>
          <input
                  type="text"
                  id="text"
                  v-model="description">
        </div>
       
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="germany">Germany</option>
            <option value="usa">USA</option>
            <option value="spain">Spain</option>
            <option value="uk">UK</option>            
          </select>
        </div>
       
        <div class="input">
          <label for="postcode">Postcode</label>
          <input
                  type="text"
                  id="text"
                  v-model="postcode">
        </div>
        
        <div class="input">
          <label for="street">Street</label>
          <input
                  type="text"
                  id="text"
                  v-model="street">
        </div>

        <div class="input">
          <label for="city">City</label>
          <input
                  type="text"
                  id="text"
                  v-model="city">
        </div>

        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        description: '',
        picture: '',
        postcode: '',
        street: '',
        country: 'usa',
        city: ''
      }
    },
    methods: {

      onSubmit () {
        const formData = {
          name: this.name,
          description: this.description,
          //picture: this.picture,
          postcode: this.postcode,
          street: this.street,
          country: this.country,
          city: this.city
        }
        console.log(formData)
        this.$store.dispatch('newEvent', formData)
      }
    }
  }
</script>

<style scoped>
  .event-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>