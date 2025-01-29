---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <!-- Debug output -->
    <pre>
      Thumbnail: {{ knife.data.thumbnail }}
    </pre>
    
    {% assign thumbnailPath = knife.data.thumbnail %}
    {% include "postImage.html" 
      src=thumbnailPath
      alt=knife.data.title
    %}
    <h2>{{ knife.data.title }}</h2>
  {% endfor %}
</div>