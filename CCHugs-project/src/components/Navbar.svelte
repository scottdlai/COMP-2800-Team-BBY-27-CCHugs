<script>
    import {auth} from "./../Firebase.js";
    import {firestore} from "./../Firebase.js";
    import Signout from "./../signup-login/signout.svelte";
    import HowToHug from "./HowToHug.svelte";

    function homeR() {
      location.replace('/mainpage');
    }

let isSticky = false;

const handleScrolldown = () => {
  isSticky = true;
  if (window.scrollY == 0){
    isSticky = false;
  }
}
</script>

<svelte:window on:scroll={handleScrolldown}/>

<main>
  <nav class="navbar navbar-expand-lg navbar-light"class:sticky={isSticky}>
    <button class="navbar-toggler collapsed " type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto  align-items-center" data-target=".navbar-collapse">
          <li>
          <img src="../DifferentLogo2.svg" alt="All the Hugs" on:click={homeR}>
          </li>

          <li>
          <HowToHug></HowToHug>
          </li>

          <li>
          <Signout></Signout>
          </li>
      </ul>
    </div>
  </nav>
</main>

<style>
img{
  width:60%;
  margin-bottom: 15px;
}

li {
  margin-left: 25px;
  margin-right: 25px;
  cursor: pointer;
}
  
nav{
  overflow: hidden;
  text-align: center;
  background-image: linear-gradient(180deg, #FFE66D, #ffffff);
  /* background-color: #FFE66D; */
  position: relative;
  top: 0;
  width: 100%;
  z-index: 1;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>