---
layout: gallery
title: Knife Gallery
permalink: /gallery/
---
<div class="knife-grid">
  {% for knife in collections.knives %}
    <a href="{{ knife.url }}" class="knife-card">
      {% image knife.data.thumbnail, knife.data.title %}
      <h2>{{ knife.data.title }}</h2>
    </a>
  {% endfor %}
</div>