/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

function createIntlBlock (container) {
    return (template, serviceContext) => {
        let service = container.lookup('service:intl');

        if (typeof serviceContext === 'object') {
            Ember.run(() => {
                service.setProperties(serviceContext);
            });
        }

        // suppress deprecation warnings
        if (Ember && Ember.ENV) {
            Ember.ENV._ENABLE_LEGACY_VIEW_SUPPORT = true;
        }

        return Ember.View.create({
            template: template,
            container: container
        });
    };
}

export default createIntlBlock;
