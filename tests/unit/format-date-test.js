/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import formatDateHelper from 'ember-intl/helpers/format-date';
import registerHelper from 'ember-intl/utils/register-helper';

import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';

var date = 1390518044403;
var view;

moduleFor('ember-intl@formatter:format-date', {
    needs: ['service:intl'],
    beforeEach() {
        registerHelper('format-date', formatDateHelper, this.container);
        this.render = createIntlBlock(this.container);
    },
    afterEach() {
        runDestroy(view);
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatDateHelper);
});

test('invoke the formatDate directly', function(assert) {
    assert.expect(1);
    let service = this.container.lookup('service:intl');
    assert.equal(service.formatDate(date, {
        timeZone: 'UTC',
        locale: 'en-us'
    }), '1/23/2014');
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-date}}`);
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-date');
});

test('it should return a formatted string from a date string', function(assert) {
    assert.expect(1);
    // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
    view = this.render(hbs`{{format-date date timeZone='UTC'}}`, {locale: 'en-us'});
    view.set('context', { date: date });
    runAppend(view);
    assert.equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string from a timestamp', function(assert) {
    assert.expect(1);
    // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
    view = this.render(hbs`{{format-date date timeZone='UTC'}}`, {locale: 'en-us'});
    view.set('context', { date: date });
    runAppend(view);
    assert.equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string of just the date', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-date date hour='numeric' minute='numeric' timeZone='UTC'}}`, {locale: 'en-us'});
    view.set('context', { date: date });
    runAppend(view);
    assert.equal(view.$().text(), '11:00 PM');
});

test('it should format the epoch timestamp', function(assert) {
    assert.expect(1);
    let locale = 'en-us';
    view = this.render(hbs`{{format-date 0}}`, {locale: locale});
    runAppend(view);
    assert.equal(view.$().text(), new Intl.DateTimeFormat(locale).format(0));
});
