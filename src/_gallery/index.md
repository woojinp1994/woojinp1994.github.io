---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <div style="border: 1px solid black; margin: 10px; padding: 10px;">
      <!-- Pass the knife.url from index.md to galleryImage.html -->
      {% include "galleryImage.html" 
        src: knife.data.thumbnail, 
        alt: knife.data.title, 
        linkUrl: knife.url 
      %}
  {% endfor %}
    </div>
</div>
