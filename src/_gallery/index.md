---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    {% include "figure.html" 
      src=knife.data.thumbnail
      alt=knife.data.title
    %}
    <h2>{{ knife.data.title }}</h2>
  {% endfor %}
</div>