---
layout: gallery
title: Knife Gallery
permalink: /gallery/
---
<div class="knife-grid">
  {% for knife in collections.knives %}
    <a href="{{ knife.url }}" class="knife-card">
      {% include "image.html" 
        src=knife.data.thumbnail
        alt=knife.data.title
        isLazy=true
      %}
      <h2>{{ knife.data.title }}</h2>
    </a>
  {% endfor %}
</div>