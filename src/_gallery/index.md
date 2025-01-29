---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <!-- Debug output -->
    <pre>
      Thumbnail type: {{ knife.data.thumbnail | typeof }}
      Thumbnail value: {{ knife.data.thumbnail }}
    </pre>
    
    {% assign thumbnailPath = knife.data.thumbnail %}
    {% include "postImage.html" 
      src=thumbnailPath
      alt=knife.data.title
    %}
  {% endfor %}
</div>