process.env.TS_NODE_COMPILER_OPTIONS = '{"module":"commonjs"}';
require('ts-node/register');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

const React = require('react');
const { render } = require('@testing-library/react');
const { test } = require('node:test');
const assert = require('assert');
const BeeCard = require('../src/components/BeeCard.tsx').default;

test('renders decorations when decorative is true', () => {
  const { container } = render(
    React.createElement(BeeCard, { decorative: true }, React.createElement('div', null, 'content'))
  );
  const decorations = container.querySelectorAll('div.absolute');
  assert.equal(decorations.length, 2);
});

test('omits decorations when decorative is false', () => {
  const { container } = render(
    React.createElement(BeeCard, null, React.createElement('div', null, 'content'))
  );
  const decorations = container.querySelectorAll('div.absolute');
  assert.equal(decorations.length, 0);
});
