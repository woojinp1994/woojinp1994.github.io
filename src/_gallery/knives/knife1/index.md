---
layout: knife
title: Cool Knife 1
thumbnail: ./images/image1.jpg
images:
  - ./images/image1.jpg
  - ./images/image2.jpg
  - ./images/image3.jpg
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