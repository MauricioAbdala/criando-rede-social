import { users, posts, suggestUsers } from "./database.js"

function renderCards() {
  const cardContainer = document.getElementById("card__container");

  for (let user of users) {

    const card = document.createElement("div");
    const userImage = document.createElement("img");
    const userName = document.createElement("h2");
    const userStack = document.createElement("p");

    card.classList.add("position__top--left");
    userImage.classList.add("cardImage");
    userName.classList.add("cardName");
    userStack.classList.add("cardStack");

    userImage.src = user.img;
    userImage.alt = user.user;
    userName.textContent = user.user;
    userStack.textContent = user.stack;

    card.append(userImage, userName, userStack);
    cardContainer.appendChild(card);
  }
}
renderCards();


function renderPosts() {
  const postContainer = document.getElementById("post__container");


  for (let post of posts) {

    const postElement = document.createElement("div");
    const userImage = document.createElement("img");
    const userName = document.createElement("h3");
    const userStack = document.createElement("p");
    const postTitle = document.createElement("h2");
    const postText = document.createElement("p");
    const postUser = document.createElement("p");
    const button = document.createElement("button");
    const heartIcon = document.createElement("i");
    const likesCount = document.createElement("span");

    postElement.classList.add("post");
    userImage.classList.add("postImage");
    userName.classList.add("postName");
    userStack.classList.add("postStack");
    postTitle.classList.add("postTitle");
    postText.classList.add("postText");
    postUser.classList.add("postUser");
    button.classList.add("btn_openPost");
    heartIcon.classList.add("liked");
    heartIcon.classList.add("fas", "fa-heart");

    userImage.src = post.img;
    userImage.alt = post.user;
    userName.textContent = post.user;
    userStack.textContent = post.stack;
    postTitle.textContent = post.title;
    postText.textContent = post.text;
    postUser.textContent = `Author: ${post.user}`;
    button.textContent = post.button;
    likesCount.textContent = post.likes;

    postElement.append(userImage, userName, userStack, postTitle,
      postText, postUser, button, heartIcon, likesCount);

    postContainer.appendChild(postElement);

    
    const maxLength = 150;

    if (post.text.length > maxLength) {

      const truncatedText = post.text.substring(0, maxLength) + "...";
      postText.textContent = truncatedText;
    } else {
      postText.textContent = post.text;
    }

    
    heartIcon.addEventListener("click", function () {

      if (heartIcon.classList.contains("liked")) {

        heartIcon.classList.remove("liked");
        post.likes++;
      } else {
        heartIcon.classList.add("liked");
        post.likes--;
      }
      likesCount.textContent = post.likes;
    });


    button.addEventListener("click", function () {
      openModal(post);
    });
  }
}
renderPosts();


function openModal(post) {

  const modal = document.createElement("dialog");
  const userImage = document.createElement("img");
  const userName = document.createElement("h3");
  const userStack = document.createElement("p");
  const postTitle = document.createElement("h2");
  const postText = document.createElement("p");
  const closeButton = document.createElement("button");

  userImage.classList.add("modal_postImage");
  userName.classList.add("modal_postName");
  userStack.classList.add("modal_postStack");
  postTitle.classList.add("modal_postTitle");
  postText.classList.add("modal_postText");
  closeButton.classList.add("modal__btn--closed");

  userImage.src = post.img;
  userImage.alt = post.user;
  userName.textContent = post.user;
  userStack.textContent = post.stack;
  postTitle.textContent = post.title;
  postText.textContent = post.text;
  closeButton.textContent = "X";

  modal.append(userImage, userName, closeButton, userStack, postTitle, postText);

  document.body.appendChild(modal);

  closeButton.addEventListener("click", function () {
    closeModal(modal);
  });

  modal.showModal();
}


function closeModal(modal) {
  modal.close();
}


function renderSuggestedUsers() {
  const suggestUsersContainer = document.getElementById("suggest-users-container");

  for (let user of suggestUsers) {
  
    const userElement = document.createElement("div");
    const userImage = document.createElement("img");
    const userName = document.createElement("h3");
    const userStack = document.createElement("p");
    const userFollow = document.createElement("div");
    const button = document.createElement("button");

    userElement.classList.add("position__top--right");  
    userImage.classList.add("suggestUserImage");
    userName.classList.add("suggestUserName");
    userStack.classList.add("suggestUserStack");
    userFollow.classList.add("suggestFollow");
    button.classList.add("btn_follow");

    userImage.src = user.img;
    userImage.alt = user.user;  
    userName.textContent = user.user; 
    userStack.textContent = user.stack;
    button.textContent = user.button;
  
    userElement.append(userImage, userName, userStack, userFollow, button);

    suggestUsersContainer.appendChild(userElement);

    button.addEventListener("click", function () {
      if (this.textContent === "Seguir") {
        this.textContent = "Seguindo";
        this.classList.add("btn__follow--active");
      } else {
        this.textContent = "Seguir";
        this.classList.remove("btn__follow--active");
      }
    });
  }
}
renderSuggestedUsers();


function createPost() {
  const inputTitle = document.querySelector('.input_title');
  const inputText = document.querySelector('.input_text');
  const btnPost = document.querySelector('.btn_post');

  btnPost.addEventListener('click', function () {
    const title = inputTitle.value;
    const text = inputText.value;

    const newPost = {
      title: title,
      text: text,
      user: "Samuel Leão",
      stack: "Front end Engineer",
      button: "Abrir Post",
      likes: 0,
      img: "./src/assets/img/user1.svg",
    };

    addPost(newPost);

    inputTitle.value = '';
    inputText.value = '';

    clearPosts();
    renderPosts();
  });
}
createPost();


function addPost(post) {
  const postExists = posts.some(existingPost => existingPost.id === post.id);

  if (!postExists) {
    posts.push(post);
  }
}


function clearPosts() {
  const postContainer = document.getElementById("post__container");
  postContainer.textContent = ""; 
}
