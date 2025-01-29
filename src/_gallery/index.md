---
layout: gallery
title: Knife Gallery
permalink: /gallery/
---
{% for knife in collections.knives %}
<a href="{{ knife.url }}" class="knife-card">
  {% include "postImage.html" 
    src: knife.data.thumbnail
    alt: knife.data.title
  %}
  <h2>{{ knife.data.title }}</h2>
</a>
{% endfor %}