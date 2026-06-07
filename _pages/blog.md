---
layout: page
permalink: /blog/
title: Blog
description: Posts and write-ups.
nav: true
nav_order: 3
---

<ul class="post-list">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
    <li>
      <h2>
        <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>
      {% if post.description %}
        <p>{{ post.description }}</p>
      {% endif %}
      <p class="post-meta">{{ post.date | date: '%B %-d, %Y' }}</p>
    </li>
  {% endfor %}
</ul>
