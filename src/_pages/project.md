---
title: Projects
description: My software projects
permalink: /projects/
layout: project
lastUpdated: 2024-02-08
---
## Software Projects

See below for a few projects I've been working on.

<ul class="col-wrap align-center">
  {%- for project in projects -%}
    <li class="project-wrapper">
      {%- include "projectCard.html" project: project -%}
    </li>
  {%- endfor -%}
  <li class="github-cta stack flex-center gap-0 text-center">
    <div>
      <h3 class="size-font-base">Want to see more of my work?</h3>
      <p>Explore my GitHub repos:</p>
    </div>
    <a
      class="flex"
      aria-label="View my GitHub profile"
      href="https://github.com/woojinp1994?tab=repositories"
      >{%- socialIcon "github" -%}</a>
  </li>
</ul>
