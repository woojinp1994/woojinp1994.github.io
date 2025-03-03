---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <div class="knife-item">
      <!-- Display Image inside black box -->
      {% include "galleryImage.html" 
        src: knife.data.thumbnail, 
        alt: knife.data.title, 
        linkUrl: knife.url 
      %}
    </div>
  {% endfor %}
</div>
