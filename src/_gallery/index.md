---
layout: default
title: Knife Gallery
permalink: /gallery/
---

<div class="knife-grid">
  {% for knife in collections.knives %}
    <div style="border: 1px solid black; margin: 10px; padding: 10px;">
      <p>Thumbnail path: {{ knife.data.thumbnail }}</p>
      <p>Title: {{ knife.data.title }}</p>
      <p>URL: {{ knife.url }}</p>
      <p>Input Path: {{ page.inputPath }}</p>
      <p>Path Parse (Directory): {{ page.inputPath | pathParse: 'dir' }}</p>
    </div>
  {% endfor %}
</div>