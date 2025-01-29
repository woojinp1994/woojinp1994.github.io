---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    {% include "postImage.html" src=knife.data.thumbnail alt=knife.data.title %}
  {% endfor %}
</div>