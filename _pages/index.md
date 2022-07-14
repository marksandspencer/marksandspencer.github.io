---
layout: default
title: Engineering at Marks and Spencer
description: A Digital Garden
permalink: /
banner:
  height: 450px
---

<section class="dc--text-center page-section
page-section--background-highlight" style="padding: 30px 0 30px 0" id="os-projects">
  <div class="dc-container dc-container--limited">
    <h2 class="dc-h2">
     Software Engineering Blog
    </h2>
    <p class="dc-p">
      Fostering an open culture
    </p>
  </div>
</section>

<section class="dc--text-center page-section page-section--padding page-section--background page-section--background-gradient strategy" id="os-goals">
  <div class="dc-container dc-container--limited">
    <h1 class="dc-h1 page-section__header">
      What goes on here
    </h1>

    <p class="dc-p strategy__subtitle">
      A look inside to how Marks and Spencer Engineers think, learn and build
    </p>

    <br>

    <div class="dc-row">
      <div class="goal dc-column dc-column--large-4 dc-column--medium-12 dc-column--small-12">
        <div class="goal__icon">
          <object id="goal-participate" data="assets/svg/slideshare.svg" type="image/svg+xml"></object>
        </div>
        <h2 class="dc-h2">Participate</h2>
        <p class="dc-p">
           Encouraging Engineers to adopt an open ethos
        </p>
      </div>

      <div class="goal dc-column dc-column--large-4 dc-column--medium-12 dc-column--small-12">
        <div class="goal__icon">
          <object id="goal-share" data="assets/svg/handshake-o.svg" type="image/svg+xml"></object>
        </div>
        <h2 class="dc-h2">Share</h2>
        <p class="dc-p">
            Share knowledge, ideas, technology for benefit of the community
        </p>
      </div>

      <div class="goal dc-column dc-column--large-4 dc-column--medium-12 dc-column--small-12">
        <div class="goal__icon">
          <object id="goal-promote" data="assets/svg/gg.svg" type="image/svg+xml"></object>
        </div>
        <h2 class="dc-h2">Promote</h2>
        <p class="dc-p">
          Enabling adoption, contribution and sharing into Open Source
        </p>
      </div>
    </div>

  </div>
</section>



{% include recent-posts.html %}

<section class="dc--text-center page-section page-section--padding page-section--background-white team" id="os-team">
  <div class="dc-container dc-container--limited">
    <h1 class="dc-h1 page-section__header">The Team</h1>
    <div id="os-team-data" class="users"></div>
  </div>
</section>

<script src="{{ 'components/user.js' | relative_url }}" type="text/javascript"></script>

<script type="text/javascript">
  async function init() {
    displayTeam();
  }
  
  init();
</script>

