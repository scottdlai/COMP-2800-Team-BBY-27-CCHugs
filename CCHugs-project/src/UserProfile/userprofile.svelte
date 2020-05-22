<script>
  import Navbar from "../components/Navbar.svelte";
  import { auth } from "./../Firebase.js";
  import { firestore } from "./../Firebase.js";
  import Att from "../friends/FriendAtt.svelte";
  import Footer from "./../components/Footer.svelte";
  export let uid;
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";

  let editProfile = function() {
    location.href = "/userprofileEdit";
  };

  let newUser;
  let getUser = new Promise((resolve, reject) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    newUser = urlParams.get("user");
    resolve();
  });

  let displayName;
  let userQuote;
  let profileId;

  let check = new Promise((resolve, reject) => {
    getUser.then(() => {
      firestore
        .collection("Users")
        .where("username", "==", newUser)
        .onSnapshot(function(snapshot) {
          if (!snapshot.empty) {
            snapshot.forEach(snap => {
              displayName = snap.data().displayName;
              userQuote = snap.data().quote;
              let userPicture = snap.data().displayPicture;
              profileId = snap.id;
              document.getElementById("profilePicture").src = userPicture;
            });
            resolve();
          } else {
            reject();
          }
        });
    });
  });

  let yourProfile = false;

  onMount(() => {
    check.then(() => {
      if (uid == profileId) {
        yourProfile = true;
        console.log(uid);
        console.log(profileId);
      }
    });
  });
</script>

<style>
  main {
    height: 100%;
    display: grid;
    grid-template-areas:
      "nav"
      "header"
      "profileSection"
      "sentHugSection"
      "badgeSection"
      "section"
      "footer";
  }

  nav {
    margin-bottom: 110px;
    grid-area: nav;
  }

  header {
    grid-area: header;
  }

  footer {
    margin-top: auto;
    grid-area: footer;
  }

  .profileSection {
    grid-area: profileSection;
  }

  .sentHugSection {
    grid-area: sentHugSection;
  }

  .badgeSection {
    grid-area: badgeSection;
  }

  @media (min-width: 1024px) {
    main {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "nav nav"
        "header header"
        "profileSection badgeSection"
        "sentHugSection section"
        "footer footer";
    }
    .profileSection {
      margin: 25px;
      text-align: center;
    }
    .badgeSection,
    .sentHugSection {
      margin: 25px;
    }
  }

  @media (min-width: 440px) and (max-width: 1024px) {
    main {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "nav nav"
        "header header"
        "profileSection sentHugSection"
        "badgeSection badgeSection"
        "footer footer";
    }
  }

  @media (max-width: 440px) {
    main {
      grid-template-columns: 1;
      grid-template-areas:
        "nav"
        "header"
        "profileSection"
        "sentHugSection"
        "badgeSection"
        "footer";
    }
  }

  button {
    margin: auto;
    width: 50%;
    height: 50px;
    background-color: #ff9e6d;
    border-radius: 25px;
  }

  #profilePicture {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    border-radius: 50%;
  }

  .backgroundContainer {
    margin: 15px;
    padding: 10px;
    background-image: linear-gradient(135deg, #6dffe7, #ffffff);
    border-radius: 25px;
    border: 2px solid black;
  }

  a {
    margin-left: auto;
    margin-right: auto;
  }

  .displayBadge {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .buttonDisplay {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  h2 {
    font-size: 100%;
    font-weight: 700;
  }

  p {
    font-size: 100%;
  }
</style>

<main>
  <nav>
    <Navbar />
  </nav>

  <header>
    <Header profileName={'Profile'} />
  </header>

  <div class="buttonDisplay profileSection">
    <img id="profilePicture" alt="profile picture" />
    {#if yourProfile}
      <button on:click={editProfile}>Edit Profile</button>
    {/if}
    {#if !yourProfile}
      <Att {uid} profile={newUser} profDN={displayName} profUN={newUser} />
    {/if}
    <div class="backgroundContainer">
      <h2>Display Name:</h2>
      <p id="dname">{displayName}</p>
      <h2>Quotes:</h2>
      <p id="quote">{userQuote}</p>
    </div>
  </div>

  <div class="backgroundContainer sentHugSection">
    <h2>Sent Hugs</h2>
    <hr />
    <div class="buttonDisplay">
      <a href="https://placeholder.com">
        <img
          src="https://via.placeholder.com/128"
          alt="blank 128 X 128 Square" />
      </a>
    </div>
  </div>

  <div class="backgroundContainer badgeSection">
    <h2>{displayName} Badges</h2>
    <hr />
    <div class="displayBadge">
      <a href="https://placeholder.com">
        <img
          src="https://via.placeholder.com/128"
          alt="blank 128 X 128 Square" />
      </a>
      <a href="https://placeholder.com">
        <img
          src="https://via.placeholder.com/128"
          alt="blank 128 X 128 Square" />
      </a>
    </div>
  </div>

  <footer>
    <Footer />
  </footer>

</main>
