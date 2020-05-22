<script>
  import Navbar from "../components/Navbar.svelte";
  import { auth } from "./../Firebase.js";
  import { firestore } from "./../Firebase.js";
  import Footer from "./../components/Footer.svelte";
  import Header from "../components/Header.svelte";

  let toMainPage = function() {
    location.replace("/mainpage");
  };

  function displayName() {
    auth.onAuthStateChanged(function(user) {
      firestore
        .collection("Users")
        .doc(user.uid)
        .onSnapshot(function(snap) {
          let userName = snap.data().displayName;
          document.getElementById("nameField").value = userName;
        });
    });
  }
  displayName();

  function writeFeedback() {
    let userFeedBack = document.getElementById("feedback").value;
    let userName = document.getElementById("nameField").value;
    let date = new Date();
    let feedBackObject = {
      Name: userName,
      Feedback: userFeedBack,
      Date: date
    };
    firestore
      .collection("Feedback")
      .add(feedBackObject)
      .then(function() {
        location.replace("/mainpage");
      });
  }
</script>

<style>
  main {
    height: 100%;
    display: grid;
    grid-template-areas:
      "nav"
      "header"
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

  section {
    margin: 25px;
    grid-area: section;
  }

  footer {
    margin-top: auto;
    grid-area: footer;
  }

  @media (min-width: 1024px) {
    main {
      grid-template-columns: repeat(1, 1fr);
      grid-template-areas:
        "nav"
        "header"
        "section"
        "footer";
    }

    .buttonDisplay {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-template-areas: "section";
      padding: 30px 100px;
    }
  }

  @media (min-width: 520px) and (max-width: 1024px) {
    main {
      grid-template-columns: repeat(1, 1fr);
      grid-template-areas:
        "nav"
        "header"
        "section"
        "footer";
    }

    .buttonDisplay {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-template-areas: "section";
      padding: 0px 50px;
    }
  }

  @media (max-width: 520px) {
    main {
      grid-template-columns: repeat(1, 1fr);
      grid-template-areas:
        "nav"
        "header"
        "section"
        "footer";
    }
    .buttonDisplay {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-template-areas: "section";
    }
  }

  #feedback {
    padding: 15px;
    width: 100%;
    height: 200px;
    border-radius: 25px;
    font-size: 1em;
    border: 2px solid black;
    background-image: linear-gradient(180deg, #6dffe7, #ffffff);
    resize: none;
  }

  #nameField {
    border: 2px solid black;
    border-radius: 25px;
    padding: 5px 5px 5px 15px;
    background-image: linear-gradient(90deg, #6dffe7, #ffffff);
  }

  #formButtons {
    margin-top: 25px;
  }

  #submit {
    background-color: #ff9e6d;
    border-radius: 25px;
    width: 50%;
    float: right;
    height: 50px;
    font-weight: bold;
    border: 2px solid black;
  }

  button {
    background-color: #ff9e6d;
    border-radius: 25px;
    float: left;
    width: 50%;
    font-size: 100%;
    border-radius: 25px;
    border: 2px solid black;
    font-weight: bold;
    height: 50px;
  }

  label {
    width: 100%;
  }
</style>

<main>
  <nav>
    <Navbar />
  </nav>

  <header>
    <Header profileName={'Feedback'} />
  </header>

  <section class="buttonDisplay">
    <form on:submit|preventDefault={writeFeedback}>
      <fieldset>
        <label>
          Name:
          <input id="nameField" type="text" />
        </label>
        <br />
        <label>
          Feedback:
          <textarea id="feedback" placeholder="Please type feedback here...." />
        </label>
      </fieldset>
      <div id="formButtons">
        <button type="button" on:click={toMainPage}>Cancel</button>
        <input id="submit" type="submit" value="Submit" />
      </div>
    </form>
  </section>

  <footer>
    <Footer />
  </footer>
</main>
