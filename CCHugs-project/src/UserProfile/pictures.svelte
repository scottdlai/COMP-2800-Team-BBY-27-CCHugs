<script>
  import Navbar from "../components/Navbar.svelte";
  import { auth } from "./../Firebase.js";
  import { firestore } from "./../Firebase.js";
  import Footer from "./../components/Footer.svelte";

  let editProfile = function() {
    location.href = "/userprofileEdit";
  };

  function showPicture() {
    auth.onAuthStateChanged(function(user) {
      firestore
        .collection("Users")
        .doc(user.uid)
        .onSnapshot(function(snap) {
          let userPicture = snap.data().displayPicture;
          document.getElementById("profilePicture").src = userPicture;
        });
    });
  }
  showPicture();

  let click = function() {
    let profilePicture = this.src;
    auth.onAuthStateChanged(function(user) {
      firestore
        .collection("Users")
        .doc(user.uid)
        .update({
          displayPicture: profilePicture
        })
        .then(function() {
          location.replace("/userprofileEdit");
        });
    });
  };
</script>

<style>
  input {
    border-radius: 50%;
  }
</style>

<Navbar />

<header>
  <h1>This is a header</h1>
</header>

<img id="profilePicture" src="" alt="your profile pciture" />
<p>Current Photo</p>
<div>
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/1.png?alt=media&token=757df37d-dbda-4e4b-a645-6070d666d16d"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/2.png?alt=media&token=51861bf7-d898-44c4-99f6-fd3bb2087480"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/3.png?alt=media&token=371a005f-8dc1-4d5c-babf-fc566fc50c76"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/4.png?alt=media&token=6e6a5ec2-4769-4bb1-a80c-ea4127307a0b"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/5.png?alt=media&token=17a0e95d-d048-4e50-a511-021946f882fe"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/6.png?alt=media&token=0fa4006f-5c51-4b48-b346-9e785590ff62"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/7.png?alt=media&token=a11d39ba-e93e-401d-907f-703684ba61cd"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/8.png?alt=media&token=1df74ebc-3680-4a74-9b03-2a7dde14bae0"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/9.png?alt=media&token=f687e2cc-d6c5-46a8-929e-71222c4d1f8b"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/10.png?alt=media&token=f2d42fd5-9d7d-492c-8955-b4f19630953e"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/11.png?alt=media&token=bb10bb59-d241-42e9-adbb-49c994e8117d"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/12.png?alt=media&token=6a450207-679f-4f20-a451-c60257efd2ef"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/13.png?alt=media&token=4884f4b7-2a66-427c-afcf-426c5a0f5661"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/14.png?alt=media&token=610eb717-bf9c-45b6-8342-0c04a91f2ae1"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/15.png?alt=media&token=da26fb46-6354-41b6-8f14-57c5858a63c2"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/16.png?alt=media&token=6397517c-9434-4422-a983-0cf34c3b8608"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/17.png?alt=media&token=1b642777-2f72-4f7f-b8e0-8e7a3d7e7347"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/19.png?alt=media&token=e8ebea91-4a81-4eb9-9b07-1648be3a6479"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/20.png?alt=media&token=68008308-0e34-45e4-a027-426b48f62d01"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/23.png?alt=media&token=3e720b02-b1ee-4a54-8d8a-099a4e5df5d1"
    alt="profile"
    on:click={click} />
  <input
    type="image"
    src="https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/25.png?alt=media&token=a55009b0-96d0-44a9-ae3a-c34d0321152a"
    alt="profile"
    on:click={click} />

</div>
<Footer />
