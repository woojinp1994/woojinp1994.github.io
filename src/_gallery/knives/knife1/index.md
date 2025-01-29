---
layout: knife
title: Cool Knife 1
thumbnail: /knives/knife1/images/image1.jpg
images:
  - /knives/knife1/images/image1.jpg
  - /knives/knife1/images/image2.jpg
  - /knives/knife1/images/image3.jpg
specs:
  steel: VG10
  handle: Walnut
  length: 8 inches
---

<div id="carousel" class="knife-carousel">
  <div role="region" tabindex="0">
    <div role="list">
      {% for image in page.images %}
        <div role="listitem">
          {% include "postImage.html" 
            src=image
            alt=title
          %}
        </div>
      {% endfor %}
    </div>
  </div>
</div>

<template id="carousel-controls">
  <div class="carousel-controls">
    <button type="button" data-direction="start">Previous</button>
    <button type="button" data-direction="end">Next</button>
  </div>
</template>