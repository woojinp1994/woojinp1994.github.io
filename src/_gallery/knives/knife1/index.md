---
layout: knife
title: Knife Name
thumbnail: /assets/images/knives/knife1-thumb.jpg
images:
  - /assets/images/knives/knife1-1.jpg
  - /assets/images/knives/knife1-2.jpg
  - /assets/images/knives/knife1-3.jpg
specs:
  steel: VG10
  handle: Walnut
  length: 8 inches
---
<div class="knife-carousel">
  {% for image in images %}
  <img src="{{ image }}" alt="{{ title }}">
  {% endfor %}
</div>

<h1>{{ title }}</h1>

<div class="knife-specs">
  <h2>Specifications</h2>
  <ul>
    <li>Steel: {{ specs.steel }}</li>
    <li>Handle: {{ specs.handle }}</li>
    <li>Length: {{ specs.length }}</li>
  </ul>
</div>

<div class="knife-description">
  <!-- Add knife description here -->
</div>