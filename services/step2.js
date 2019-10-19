'use strict';

// Imports dependencies
const Response = require('./response'),
  config = require('./config'),
  i18n = require('../i18n.config');

module.exports = class Curation {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;
    // let outfit;

    switch (payload) {
      case 'GO_DOWNSTAIRS':
        response = [
          Response.genMediaTemplate(
            `https://www.facebook.com/107683150653553/videos/527278891393794/`
          ),
          Response.genQuickReply(i18n.__('step2down.prompt'), [
            {
              title: i18n.__('step2down.go_through_tunnel'),
              payload: 'EXAMINE_ROPE',
            },
            {
              title: i18n.__('step2down.break_the_window'),
              payload: 'BREAK_THE_WINDOW',
            },
          ]),
        ];
        break;
      case 'GO_UPSTAIRS':
        response = [
          Response.genMediaTemplate(
            `https://www.facebook.com/107683150653553/videos/402155497389970/?modal=admin_todo_tour`
          ),
          Response.genQuickReply(i18n.__('step2up.prompt'), [
            {
              title: i18n.__('step2up.examine_rope'),
              payload: 'EXAMINE_ROPE',
            },
            {
              title: i18n.__('step1.examine_backpack'),
              payload: 'EXAMINE_BACKPACK',
            },
          ]),
        ];
        break;
    }

    return response;
  }

  genCurationResponse(payload) {
    let occasion = payload.split('_')[3].toLowerCase();
    let budget = payload.split('_')[2].toLowerCase();
    let outfit = `${this.user.gender}-${occasion}`;

    let buttons = [
      Response.genWebUrlButton(
        i18n.__('curation.shop'),
        `${config.shopUrl}/products/${outfit}`
      ),
      Response.genPostbackButton(
        i18n.__('curation.show'),
        'CURATION_OTHER_STYLE'
      ),
    ];

    if (budget === '50') {
      buttons.push(
        Response.genPostbackButton(i18n.__('curation.sales'), 'CARE_SALES')
      );
    }

    let response = Response.genGenericTemplate(
      `${config.appUrl}/styles/${outfit}.jpg`,
      i18n.__('curation.title'),
      i18n.__('curation.subtitle'),
      buttons
    );

    return response;
  }

  randomOutfit() {
    let occasion = ['work', 'party', 'dinner'];
    let randomIndex = Math.floor(Math.random() * occasion.length);

    return occasion[randomIndex];
  }
};
