---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <!-- Simple debug output -->
    <pre>
      Thumbnail: {{ knife.data.thumbnail }}
    </pre>
    
    {% include "postImage.html" 
      src=knife.data.thumbnail
      alt=knife.data.title
    %}
    <h2>{{ knife.data.title }}</h2>
  {% endfor %}
</div>