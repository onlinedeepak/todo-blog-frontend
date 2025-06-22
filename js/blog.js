const blogForm = document.getElementById("blog-form");
const blogTitle = document.getElementById("blog-title");
const blogContent = document.getElementById("blog-content");
const postsDiv = document.getElementById("posts");
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts() {
  postsDiv.innerHTML = "";
  posts
    .slice()
    .reverse()
    .forEach((post, index) => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button onclick="editPost(${index})">Edit</button>
        <button onclick="deletePost(${index})">Delete</button>
      `;
      postsDiv.appendChild(postDiv);
    });
}

blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  posts.push({ title: blogTitle.value, content: blogContent.value });
  blogTitle.value = "";
  blogContent.value = "";
  savePosts();
  renderPosts();
});

function deletePost(index) {
  posts.splice(index, 1);
  savePosts();
  renderPosts();
}

function editPost(index) {
  const post = posts[index];
  blogTitle.value = post.title;
  blogContent.value = post.content;
  posts.splice(index, 1);
  savePosts();
  renderPosts();
}

renderPosts();