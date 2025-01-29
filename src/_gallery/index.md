---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <a href="{{ knife.url }}" class="knife-thumbnail">
    {% include "postImage.html" src: ".knives/knife1/images/image1.jpg", alt: "The legendary shop. This is their first and main location, of three in Fresno." %}
    </a>
  {% endfor %}
</div>