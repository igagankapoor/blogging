$(document).ready(function(){
    // Here we put all the code
    var heart = $('.heart'),
        cog = $('#cog'),
        popUp = $('.popUp'),
        closePopUp = $('#closePopUp'),
        cancelPopUp = $('#cancelPopUp');

    heart.click(function(){
        $(this).toggleClass('fa-heart-o');
        $(this).toggleClass('heart-red fa-heart');
    })

    cog.click(function(){
        popUp.fadeIn(500);
    })

    closePopUp.click(function(){
        popUp.fadeOut(500);
    })

    cancelPopUp.click(function(){
        popUp.slideUp(500)
    })

})

// js/app.js (continued)
const observer = new IntersectionObserver(entries => {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await loadMorePosts();     // implement fetch('feed.php?page=2') & append
        observer.observe(entry.target);
      }
    });
  }, { rootMargin: '200px' });
  
observer.observe(document.getElementById('load-more'));


// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    // — LIKE BUTTONS (you already have this) —
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const postId = btn.dataset.postId;
        const isLiked = btn.classList.toggle('liked');
        const res = await fetch(`like.php?post_id=${postId}&is_liked=${isLiked?1:0}`);
        const { likesCount } = await res.json();
        btn.querySelector('.count').textContent = likesCount;
      });
    });
  
    // — FOLLOW / UNFOLLOW BUTTONS —
    document.querySelectorAll('.follow-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const userId = btn.dataset.userId;
        // Toggle UI state immediately
        const isFollowing = btn.classList.toggle('following');
        btn.textContent = isFollowing ? 'Unfollow' : 'Follow';
        // Send AJAX to follow.php
        const res = await fetch(`follow.php?user_id=${userId}&action=${isFollowing ? 'follow' : 'unfollow'}`);
        const { followersCount } = await res.json();
        // Update follower count badge (if you have one)
        const badge = document.querySelector(`#followers-count-${userId}`);
        if (badge) badge.textContent = followersCount;
      });
    });  // :contentReference[oaicite:0]{index=0}
  
    // — COMMENT FORMS —
    document.querySelectorAll('.comment-form').forEach(form => {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const postId = form.dataset.postId;
        const input = form.querySelector('input[name="comment"]');
        const commentText = input.value.trim();
        if (!commentText) return;
  
        // Build FormData
        const data = new FormData();
        data.append('post_id', postId);
        data.append('comment', commentText);
  
        // Send to comment.php via POST
        const res = await fetch('comment.php', {
          method: 'POST',
          body: data
        });
        const { commentHtml } = await res.json();
  
        // Append new comment to the list
        const list = document.querySelector(`#comments-list-${postId}`);
        list.insertAdjacentHTML('beforeend', commentHtml);
  
        // Clear input
        input.value = '';
      });
    });  // :contentReference[oaicite:1]{index=1}

    document.addEventListener("DOMContentLoaded", function () {
      const toggle = document.getElementById("toggleDarkMode");
      const isDark = localStorage.getItem("dark-mode") === "true";
    
      if (isDark) {
        document.body.classList.add("dark-mode");
        toggle.checked = true;
      }
    
      toggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
      });
    });
    
  
  });
  
  