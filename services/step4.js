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

    switch (payload) {
      case 'USE_ROPE':
        response = [
          Response.genMediaTemplate(
            `https://www.facebook.com/watch/?v=450460632258216`
          ),
          Response.genText(i18n.__('step4rope.prompt')),
        ];
        break;
      case 'USE_BACKPACK':
        response = [
          Response.genMediaTemplate(
            `https://www.facebook.com/watch/?v=407595293487241`
          ),
          Response.genText(i18n.__('step4rope.prompt')),
        ];
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
