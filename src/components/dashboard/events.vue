<template>
  <div id="events">
    <h1>That's the Events page!</h1>    
    <ul>
      <li class="items-list"
          v-for="event in events">
        <img src="https://www.beatmashmagazine.com/wp-content/uploads/2015/03/lollapalooza-berlin-2015.jpg" alt="icon" width="200" height="auto" />
        <div 
          class="valueText" 
          v-for="(value, key) in event">
          {{ key }}: {{value}}  

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    computed: {
      events () {
        return !this.$store.getters.events ? false : this.$store.getters.events
      }
    },
    created () {
      this.$store.dispatch('fetchEvents')
    }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
  

.items-list {
box-shadow: -2px 1px 14px #e5e6e8;
list-style-type: none;
margin-left:0px;
padding-left:0px;
margin-bottom:15px;
width:100%;
}


@media only screen and (max-width:400px)  {
.items-list {
height:110px;
}
.items-list img
{
float:left;
 width:40%;
 height:100%;
 margin-right:7px;
}
.items-list .righttxt {
 width:100%;
padding: 5px;
}
}
@media only screen and (min-width:401px) and (max-width:500px)  {
.items-list {
height:200px;
}
.items-list img
{
float:left;
 width:45%;
 height:100%;
 margin-right:7px;
}
.items-list .righttxt {
 width:100%;
padding: 15px;
}
}

@media only screen and (min-width:501px) and (max-width:700px)   {
.items-list {
height:250px;
}

.items-list img
{
float:left;
 width:45%;
 height:100%;
 margin-right:7px;
}
.items-list .righttxt {
 width:100%;
padding: 40px;
}
}
@media only screen and (min-width:701px) and (max-width:1399px)  {
.items-list {
height:300px;
}
.items-list img
{
float:left;
 width:45%;
 height:100%;
 margin-right:7px;
}
.items-list .righttxt {
 width:100%;
padding: 50px;
}
}
@media only screen and (min-width:1400px) {
.items-list {
height:330px;
}
.items-list img
{
float:left;
 width:45%;
 height:100%;
 margin-right:7px;
}
.items-list .righttxt {
 width:100%;
padding: 60px;
}
}
.items-list img
{
 object-fit: cover;
border-right: 5px solid;
border-image:   linear-gradient(to bottom, #80d8ff 50%,#ff8a80 50%) 2;
}

.items-list .field {
  font-weight:bold;
  color:#919396;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 21px;
    max-height: 48px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.items-list .valueText {
  
  color:#919396;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 21px;
    max-height: 48px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}



</style>