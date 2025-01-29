---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <a href="{{ knife.url }}" class="knife-thumbnail">
      {% include "image.html" 
        src="/knives/knife1/images/image1.jpg"
        alt=knife.data.title
        isLazy=true
        sizes="(min-width: 768px) 50vw, 100vw"
      %}
      <h2>{{ knife.data.title }}</h2>
    </a>
  {% endfor %}
</div>