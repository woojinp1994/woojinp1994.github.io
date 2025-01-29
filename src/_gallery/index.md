---
layout: gallery
title: Knife Gallery
permalink: /gallery/
---
{% for knife in collections.knives %}
<a href="{{ knife.url }}" class="knife-card">
  {% if knife.data.thumbnail %}
    {% include "postImage.html" 
      src: knife.data.thumbnail | toString
      alt: knife.data.title
    %}
  {% endif %}
  <h2>{{ knife.data.title }}</h2>
</a>
{% endfor %}