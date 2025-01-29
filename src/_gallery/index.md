---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <a href="{{ knife.url }}" class="knife-thumbnail">
      {% include "postImage.html" 
        src=knife.data.thumbnail
        alt=knife.data.title
      %}
      <h2>{{ knife.data.title }}</h2>
    </a>
  {% endfor %}
</div>